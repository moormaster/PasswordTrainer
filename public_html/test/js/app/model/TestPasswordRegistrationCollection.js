/*
 * PasswordHasherMock with identity function as hash function and rudimental salting
 */
class PasswordHasherMock extends IPasswordHasher {
    constructor() {
        super(null);
    }
    
    generateSaltedHash(password, salt) {
        if (!salt)
            salt = Math.floor(Math.random()*1000);
        
        return password + ':' + salt;
    }
    
    parseSaltedHash(saltedHash) {
        var index = saltedHash.lastIndexOf(":");
        
        if (index >= 0 )
            return {
                salt: saltedHash.substr(index+1), 
                hash: saltedHash.substring(0, index)
            };
    }
};

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
        this.passwordRegistrationCollection = new PasswordRegistrationCollection(new PasswordHasherMock(), new ScoreDataComparatorMock());

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

QUnit.test("add()",
    function(assert) {
        this.assertCollectionLength(assert, this.passwordRegistrationCollection.collection, 2, "passwords should have been added");
        
        var hashBefore = this.passwordRegistrationCollection.collection["description1"].hash;
        this.passwordRegistrationCollection.add("description1", "different password");
        var hashAfter = this.passwordRegistrationCollection.collection["description1"].hash;
        
        this.assertCollectionLength(assert, this.passwordRegistrationCollection.collection, 2, "no passwords shall be added when updating");
        assert.ok(hashBefore != hashAfter, "password hash should be different");
    }
);

QUnit.test("rehash()",
    function(assert) {
        this.passwordRegistrationCollection.add("rehash", "mypassword");
        
        var hashBefore = this.passwordRegistrationCollection.collection["rehash"].hash;
        assert.notOk(this.passwordRegistrationCollection.rehash("rehash", "differentpassword"), "rehash should fail due to wrong password");
        var hashAfter = this.passwordRegistrationCollection.collection["rehash"].hash;
        
        assert.ok(hashBefore == hashAfter, "salted hash should be equal");

        assert.ok(this.passwordRegistrationCollection.rehash("rehash", "mypassword"), "rehash should be successful with correct password");
        var hashAfter = this.passwordRegistrationCollection.collection["rehash"].hash;
        
        assert.ok(hashBefore != hashAfter, "salted hash should NOT be equal due to correct password");
    }
);

QUnit.test("getMostRecentPasswordRegistration()",
    function(assert) {
        this.passwordRegistrationCollection.collection["description1"].scoreData.lastSuccessScore = 1;
        this.passwordRegistrationCollection.collection["description1"].scoreData.lastSuccessTimestamp = new Date().getTime();
        
        var mostRecent = this.passwordRegistrationCollection.getMostRecentPasswordRegistration();
        
        assert.equal(mostRecent.description, "description2", "description2 should be the most recent password");
    }
);
