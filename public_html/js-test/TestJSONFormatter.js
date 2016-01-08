QUnit.module(
    "JSONFormatter",
    {}
);

QUnit.test(
    "JSONFormatter.formatJSONString()",
    function(assert) {
        assert.equal(
            JSONFormatter.format(""),
            ""
        );
        
        assert.equal(
            JSONFormatter.format("abc"),
            "abc"
        );
        
        assert.equal(
            JSONFormatter.format("\"abc\\\",{}\""),
            "\"abc\\\",{}\""
        );
        
        assert.equal(
            JSONFormatter.format("abc,def"),
            "abc,\ndef"
        );
        
        assert.equal(
            JSONFormatter.format("{abc}"),
            "{\n\tabc\n}"
        );
        
        assert.equal(
            JSONFormatter.format("{{abc}}"),
            "{\n\t{\n\t\tabc\n\t}\n}"
        );
        
        assert.equal(
            JSONFormatter.format("{abc,def}"),
            "{\n\tabc,\n\tdef\n}"
        );
    }
);
