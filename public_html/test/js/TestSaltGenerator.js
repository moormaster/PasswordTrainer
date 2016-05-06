/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

QUnit.module("SaltGenerator", {
    beforeEach: function() {
        this.saltGeneratorSetups = {
            "default-charset-0-len": { length: 0, charSet: null },
            "default-charset-10-len": { length: 10, charSet: null },
            
            "hex-charset-6-len": { length: 6, charSet: '0123456789ABCDEF' }
        };
        
        this.testSaltGeneratorWithSetup = function(assert, setupName) {
            var setup = this.saltGeneratorSetups[setupName];
            assert.ok(!!setup, "salt setup not found '" + setupName + "'");
            
            var saltGenerator = new SaltGenerator(setup.length, setup.charSet);
            var salt = saltGenerator.generate();

            this.assertSaltAccordingToSetup(assert, salt, setup);
        }
        
        this.assertSaltAccordingToSetup = function(assert, salt, setup) {
            assert.equal(salt.length, setup.length, "salt length should be " + setup.length);
            
            // check salt against the custom charset from setup
            if (setup.charSet) {
                var i;
                for (i=0; i<salt.length; i++) {
                    assert.ok(setup.charSet.indexOf(salt[i]) >= 0, "salt character '" + salt[i] + "' should be part of the char set")
                }
            }
        }
    }
});

QUnit.test("SaltGenerator.generate() - default-charset-0-len",
    function(assert) {
        this.testSaltGeneratorWithSetup(assert, "default-charset-0-len");
    }
);

QUnit.test("SaltGenerator.generate() - default-charset-10-len",
    function(assert) {
        this.testSaltGeneratorWithSetup(assert, "default-charset-10-len");
    }
);

QUnit.test("SaltGenerator.generate() - hex-charset-6-len",
    function(assert) {
        this.testSaltGeneratorWithSetup(assert, "hex-charset-6-len");
    }
);
