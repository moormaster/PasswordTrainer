/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    /*
     * add new password registration
     */
    // this.add = function(description, password) {};
    
    /*
     * recreate the hash for the given password without losing score info
     */
    // this.rehash = function(description, password) {};
    
    /*
     * find the password registration with minimum lock time and maximum fee time
     */
    // this.getMostRecentPasswordRegistration = function() {};

var PasswordHasherMock = function() {
    this.prototype = new IPasswordHasher(null);
    
    this.generateSaltedHash = function(password, salt) {
        if (!salt)
            salt = Math.floor(Math.random()*1000);
        
        return password + ':' + salt;
    };
    
    this.parseSaltedHash = function(saltedHash) {
        var index = saltedHash.lastIndexOf(":");
        
        if (index >= 0 )
            return {
                salt: saltedHash.substr(index+1), 
                hash: saltedHash.substring(0, index)
            };
    }
}

QUnit.module("PasswordRegistrationCollection", {
    beforeEach: function() {
        this.passwordRegistrationCollection = new PasswordRegistrationCollection(new PasswordHasherMock());

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