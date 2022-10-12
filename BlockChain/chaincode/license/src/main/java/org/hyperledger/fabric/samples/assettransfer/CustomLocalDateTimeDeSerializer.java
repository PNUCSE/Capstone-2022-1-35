package org.hyperledger.fabric.samples.assettransfer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

class CustomLocalDateTimeDeSerializer extends StdDeserializer<LocalDateTime> {

    protected CustomLocalDateTimeDeSerializer() {
        this(null);
    }

    protected CustomLocalDateTimeDeSerializer(Class<LocalDateTime> t) {
        super(t);
    }

    @Override
    public LocalDateTime deserialize(JsonParser jsonparser, DeserializationContext context)
            throws IOException {
        Long timestamp = Long.parseLong(jsonparser.getText());
        return Instant.ofEpochSecond(timestamp).atZone(ZoneOffset.UTC).toLocalDateTime();
    }
}