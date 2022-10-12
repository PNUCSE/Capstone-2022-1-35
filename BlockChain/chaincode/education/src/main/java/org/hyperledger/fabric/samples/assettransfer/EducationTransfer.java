package org.hyperledger.fabric.samples.assettransfer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.hyperledger.fabric.contract.Context;
import org.hyperledger.fabric.contract.ContractInterface;
import org.hyperledger.fabric.contract.annotation.*;
import org.hyperledger.fabric.shim.ChaincodeException;
import org.hyperledger.fabric.shim.ChaincodeStub;
import org.hyperledger.fabric.shim.ledger.KeyValue;
import org.hyperledger.fabric.shim.ledger.QueryResultsIterator;

import java.util.*;
import java.time.Instant;
import java.time.ZoneOffset;

@Contract(
        name = "educationCC",
        info = @Info(
                title = "Asset Transfer",
                description = "Aomd asset transfer",
                version = "1.0.0",
                license = @org.hyperledger.fabric.contract.annotation.License(
                        name = "Apache 2.0 License",
                        url = "http://www.apache.org/licenses/LICENSE-2.0.html"),
                contact = @Contact(
                        email = "aomd@gmail.com",
                        name = "Jo2Seo",
                        url = "https://aomd.com")))
@Default
public final class EducationTransfer implements ContractInterface {
    private final ObjectMapper objectMapper = new ObjectMapper();

    private enum AssetTransferErrors {
        ASSET_ALREADY_EXISTS,
        ASSET_NOT_FOUND
    }

    private String getRandomString(List<String> stringList) {
        String joinedString = String.join("", stringList);
        return UUID.nameUUIDFromBytes(joinedString.getBytes()).toString();
    }

    public EducationTransfer() {
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public void init(final Context context) throws JsonProcessingException {
        ChaincodeStub stub = context.getStub();

        for (Long ownerId = 1L; ownerId <= 5; ++ownerId) {
            for (int i = 0; i < 5; ++i) {
                String ownerIdStr = String.format("user%d@gmail.com", ownerId);
                String title = getRandomString(List.of("title" + ownerId + i));
                String publisher = getRandomString(List.of("publisher" + ownerId + i));
                String state = getRandomString(List.of("state" + ownerId + i));
                String departmentInfo = getRandomString(List.of("departmentInfo" + ownerId + i));
                create(context, title, ownerIdStr, publisher, stub.getTxTimestamp().getEpochSecond(), state, departmentInfo);
            }
        }
    }

    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public String create(
            final Context context,
            final String title,
            final String ownerId,
            final String publisher,
            final Long publishedAt,
            final String state,
            final String departmentInfo
    ) throws JsonProcessingException {
        ChaincodeStub stub = context.getStub();
        String id = getRandomString(Arrays.asList(title, ownerId, publisher, publishedAt.toString(), state, departmentInfo));
        System.out.println(id);

        if (exists(context, ownerId, id)) {
            String errorMessage = String.format("Asset %s already exists", id);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, AssetTransferErrors.ASSET_ALREADY_EXISTS.toString());
        }

        Education education = new Education(id, title, ownerId, publisher, Instant.ofEpochSecond(publishedAt).atZone(ZoneOffset.UTC).toLocalDateTime(), stub.getTxTimestamp().atZone(ZoneOffset.UTC).toLocalDateTime(), state, departmentInfo);
        String educationJson = objectMapper.writeValueAsString(education);
        stub.putStringState(id, educationJson);

        return id;
    }

    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public boolean exists(final Context context, final String ownerId, final String id) throws JsonProcessingException {
        ChaincodeStub stub = context.getStub();
        String json = stub.getStringState(id);

        if (json == null || json.isEmpty()) {
            return false;
        }
        Map map = objectMapper.readValue(json, Map.class);
        return ownerId.equals(map.get("ownerId"));
    }

    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public String read(final Context context, final String ownerId, final String id) throws JsonProcessingException {
        if (!exists(context, ownerId, id)) {
            String errorMessage = String.format("Asset %s does not exists", id);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, AssetTransferErrors.ASSET_NOT_FOUND.toString());
        }

        ChaincodeStub stub = context.getStub();
        String json = stub.getStringState(id);
        return json;
    }

    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public String getAll(final Context context, final String ownerId) throws JsonProcessingException {
        ChaincodeStub stub = context.getStub();
        System.out.println("context = " + context + ", ownerId = " + ownerId);
        List<Map> queryResults = new ArrayList<>();
        QueryResultsIterator<KeyValue> results = stub.getStateByRange("", "");
        for (KeyValue result: results) {
            Map map = objectMapper.readValue(result.getStringValue(), Map.class);
            if (ownerId.equals(map.get("ownerId")))  {
                queryResults.add(map);
            }
        }
        final String response = objectMapper.writeValueAsString(queryResults);
        return response;
    }
}
