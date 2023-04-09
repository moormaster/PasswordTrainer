// vi: ts=4 et

const assert = require('chai').assert;
const SaltGenerator = require('../../../../public/js/util/hash/SaltGenerator.js').SaltGenerator;
const MD5PasswordHasher = require('../../../../public/js/util/hash/MD5PasswordHasher.js').MD5PasswordHasher;

describe("MD5PasswordHasher", function() {
    beforeEach(function() {
        this.passwordEmpty = '';
        this.password1 = '12345';
        this.password2 = 'abcde';

        this.saltGenerator = new SaltGenerator(10);
        this.passwordHasher = new MD5PasswordHasher(this.saltGenerator);
    });

    [   { description: "unsalted",  salt: "" },
        { description: "salted",  salt: "anySalt" }
    ].forEach(({description, salt}) => {
        describe("MD5PasswordHasher.generateSaltedHash() " + description, function() {
            it("should generate hash for empty password", function() {
                var passwordEmptyHash = this.passwordHasher.generateSaltedHash(this.passwordEmpty, salt);
                assert.isOk(passwordEmptyHash.length > 0);
            });

            it("should not generate randomized hash for empty password", function() {
                var passwordEmptyHash = this.passwordHasher.generateSaltedHash(this.passwordEmpty, salt);
                assert.equal(this.passwordHasher.generateSaltedHash(this.passwordEmpty, salt), passwordEmptyHash);
            });

            it("should generate hash for non-empty password", function() {
                var password1Hash = this.passwordHasher.generateSaltedHash(this.password1, salt);
                assert.isOk(password1Hash.length > 0, 'hash value shall not be null');
            });

            it("should not generate randomized hash for non-empty password", function() {
                var password1Hash = this.passwordHasher.generateSaltedHash(this.password1, salt);
                assert.equal(this.passwordHasher.generateSaltedHash(this.password1, salt), password1Hash);
            });

            it("should generate different hashes for different passwords", function() {
                var password1Hash = this.passwordHasher.generateSaltedHash(this.password1, salt);
                var password2Hash = this.passwordHasher.generateSaltedHash(this.password2, salt);
                assert.isOk(password1Hash != password2Hash);
            });
        });
    });

    describe("MD5PasswordHasher.generateSaltedHash() salted", function() {
        it("should generate a salt", function() {
            var password1Hash = this.passwordHasher.generateSaltedHash(this.password1);
            var password1ParsedHash = this.passwordHasher.parseSaltedHash(password1Hash);
            assert.isOk(password1ParsedHash.salt.length > 0);
        });

        it("should generate a different salt each time", function() {
            var password1Hash = this.passwordHasher.generateSaltedHash(this.password1);
            assert.isOk(this.passwordHasher.generateSaltedHash(this.password1) != password1Hash,);
        });
    });

});
