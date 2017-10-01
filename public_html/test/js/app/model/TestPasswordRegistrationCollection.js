/*
 * scoreDataComparator which simply orders by timestamp
 */
class ScoreDataComparatorMock extends IComparator {
    constructor() {
        super()
    }
    
    compare(obj1, obj2) {
        if (obj1 == null)
            return -1;
        
        if (obj2 == null)
            return 1;
        
        if (obj1.lastSuccessTimestamp == null)
            return -1;
        
        if (obj2.lastSuccessTimestamp == null)
            return 1;
        
        if (obj1.lastSuccessTimestamp < obj2.lastSuccessTimestamp)
            return -1;
        
        if (obj1.lastSuccessTimestamp > obj2.lastSuccessTimestamp)
            return 1;
        
        return 0;
    }
};

QUnit.module("PasswordRegistrationCollection", {
    beforeEach: function() {
        this.passwordRegistrationCollection = new PasswordRegistrationCollection(new ScoreDataComparatorMock());

        this.passwordRegistrationCollection.add("description1", "abc");
        this.passwordRegistrationCollection.add("description2", "cde");
        
        this.assertCollectionLength = function(assert, collection, expectedLength, message) {
            var l=0;
            for (var key in collection)
                l++;
            
            assert.equal(l, expectedLength, message);
        }
    }
});

QUnit.test("get()",
    function(assert)  {
        var originalRegistration = this.passwordRegistrationCollection.get("description1");
        var registration = this.passwordRegistrationCollection.get("description1");
        var registration2 = this.passwordRegistrationCollection.get("description2");
        
        assert.ok(originalRegistration !== registration, "get() should return copies of password registration");
        assert.ok(registration.description == "description1", "get() should return registration1");
        assert.ok(registration2.description == "description2", "get() should return registration2");
    }
);

QUnit.test("getAll()",
    function(assert)  {
        var registrationsMap = this.passwordRegistrationCollection.getAll();
        
        assert.ok(registrationsMap["description1"].description == "description1", "registration should be mapped to key description1");
        assert.ok(registrationsMap["description2"].description == "description2", "registration should be mapped to key description2");
    }
);

QUnit.test("add()",
    function(assert) {
        this.assertCollectionLength(assert, this.passwordRegistrationCollection.getAll(), 2, "passwords should have been added");
        
        var hashBefore = this.passwordRegistrationCollection.get("description1").hash;
        this.passwordRegistrationCollection.add("description1", "different password");
        var hashAfter = this.passwordRegistrationCollection.get("description1").hash;
        
        this.assertCollectionLength(assert, this.passwordRegistrationCollection.getAll(), 2, "no passwords shall be added when updating");
        assert.ok(hashBefore != hashAfter, "password hash should be different");
    }
);

QUnit.test("update()",
    function(assert) {
        this.passwordRegistrationCollection.add("rehash", "hash:salt");
        
        
        // 1) update the hash
        var originalRegistration = this.passwordRegistrationCollection.get("rehash");
        var registration = this.passwordRegistrationCollection.get("rehash");
        
        registration.hash = "newhash:newsalt";
        
        this.passwordRegistrationCollection.update("rehash", registration);
        registration = this.passwordRegistrationCollection.get("rehash");
        
        assert.ok(originalRegistration.description == registration.description, "description should not change");
        assert.ok(originalRegistration.hash != registration.hash, "salted hash should have changed");
        assert.ok(originalRegistration.scoreData.lastSuccessScore == registration.scoreData.lastSuccessScore, "rehash should not change scoreData");
        assert.ok(originalRegistration.scoreData.lastSuccessTimestamp == registration.scoreData.lastSuccessTimestamp, "rehash should not change scoreData");
        
        // 2) update description
        originalRegistration = this.passwordRegistrationCollection.get("rehash");
        registration.description = "newdescription";
        this.passwordRegistrationCollection.update("rehash", registration);
        registration = this.passwordRegistrationCollection.get("newdescription");
        
        assert.ok(originalRegistration.description != registration.description, "description should be changed");
        assert.ok(originalRegistration.hash == registration.hash, "salted hash should not change");
        assert.ok(originalRegistration.scoreData.lastSuccessScore == registration.scoreData.lastSuccessScore, "rehash should not change scoreData");
        assert.ok(originalRegistration.scoreData.lastSuccessTimestamp == registration.scoreData.lastSuccessTimestamp, "rehash should not change scoreData");
        assert.ok(this.passwordRegistrationCollection.get("rehash") == null, "registration should have disappeared at description slot");
    }
);

QUnit.test("getMostRecentPasswordRegistration()",
    function(assert) {
        var passwordRegistration = this.passwordRegistrationCollection.get("description1");
        
        passwordRegistration.scoreData.lastSuccessScore = 1;
        passwordRegistration.scoreData.lastSuccessTimestamp = new Date().getTime();
        
        this.passwordRegistrationCollection.update("description1", passwordRegistration);
        
        var mostRecent = this.passwordRegistrationCollection.getMostRecentPasswordRegistration();
        
        assert.equal(mostRecent.description, "description2", "description2 should be the most recent password");
    }
);
