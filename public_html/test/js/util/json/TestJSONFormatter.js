QUnit.module(
    "JSONFormatter",
    {
        beforeEach: function() {
            this.instance = new JSONFormatter();
        }
    }
);

QUnit.test(
    "JSONFormatter.formatJSONString()",
    function(assert) {
        assert.equal(
            this.instance.format(""),
            ""
        );
        
        assert.equal(
            this.instance.format("abc"),
            "abc"
        );
        
        assert.equal(
            this.instance.format("\"abc\\\",{}\""),
            "\"abc\\\",{}\""
        );
        
        assert.equal(
            this.instance.format("abc,def"),
            "abc,\ndef"
        );
        
        assert.equal(
            this.instance.format("{abc}"),
            "{\n\tabc\n}"
        );
        
        assert.equal(
            this.instance.format("{{abc}}"),
            "{\n\t{\n\t\tabc\n\t}\n}"
        );
        
        assert.equal(
            this.instance.format("{abc,def}"),
            "{\n\tabc,\n\tdef\n}"
        );
    }
);
