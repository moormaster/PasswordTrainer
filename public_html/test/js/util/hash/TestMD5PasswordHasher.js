/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

QUnit.module("MD5PasswordHasher", {
    beforeEach: function() {
        this.passwordEmpty = '';
        this.password1 = '12345';
        this.password2 = 'abcde';
        
        this.saltGenerator = new SaltGenerator(10);
        this.passwordHasher = new MD5PasswordHasher(this.saltGenerator);
    }
});

QUnit.test("MD5PasswordHasher.generateSaltedHash() unsalted", 
    function(assert) {
        // create and check nonsalted hash for an empty password
        var passwordEmptyHash = this.passwordHasher.generateSaltedHash(this.passwordEmpty, '');
        assert.ok(passwordEmptyHash.length > 0, 'hash value for empty strings shall not be null');
        assert.equal(this.passwordHasher.generateSaltedHash(this.passwordEmpty, ''), passwordEmptyHash, 'unsalted hash should be stable');
        
        // create and check nonsalted hash for password1
        var password1Hash = this.passwordHasher.generateSaltedHash(this.password1, '');
        assert.ok(password1Hash.length > 0, 'hash value shall not be null');
        assert.equal(this.passwordHasher.generateSaltedHash(this.password1, ''), password1Hash, 'unsalted hash should be stable');
        
        // create and check nonsalted hash for password2
        var password2Hash = this.passwordHasher.generateSaltedHash(this.password2, '');
        assert.ok(password2Hash.length > 0, 'hash value shall not be null');
        
        assert.ok(password1Hash != password2Hash, 'hash value of different passwords should be different');
    }
);

QUnit.test("MD5PasswordHasher.generateSaltedHash() salted", 
    function(assert) {
        // create and check salted hash for an empty password
        var passwordEmptyHash = this.passwordHasher.generateSaltedHash(this.passwordEmpty);
        assert.ok(passwordEmptyHash.length > 0, 'hash value for empty strings shall not be null');
        assert.ok(this.passwordHasher.generateSaltedHash(this.passwordEmpty) != passwordEmptyHash, 'rehashing should result in a different hash');
        
        // create and check salted hash for password1
        var password1Hash = this.passwordHasher.generateSaltedHash(this.password1);
        assert.ok(password1Hash.length > 0, 'hash value shall not be null');
        assert.ok(this.passwordHasher.generateSaltedHash(this.password1) != password1Hash, 'rehashing should result in a different hash');
        
        var password1ParsedHash = this.passwordHasher.parseSaltedHash(password1Hash);
        assert.ok(password1ParsedHash.salt.length > 0, 'salt should have been generated')
        
        assert.equal(this.passwordHasher.generateSaltedHash(this.password1, password1ParsedHash.salt), password1Hash, 'rehashing should be stable if known salt was given');
        
        // create and check salted hash for password2
        // using same salt as used for password1
        var password2Hash = this.passwordHasher.generateSaltedHash(this.password2, password1ParsedHash.salt);
        assert.ok(password2Hash.length > 0, 'hash value shall not be null');
        
        assert.ok(password1Hash != password2Hash, 'hash value of different passwords should be different even with same salt');
    }
);