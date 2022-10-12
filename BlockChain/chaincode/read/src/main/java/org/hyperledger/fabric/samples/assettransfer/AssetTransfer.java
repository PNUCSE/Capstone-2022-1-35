package org.hyperledger.fabric.samples.assettransfer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
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
        name = "readCC",
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
public class AssetTransfer implements ContractInterface {
    private final ObjectMapper objectMapper = new ObjectMapper();

    private enum AssetTransferErrors {
        ASSET_NOT_FOUND,
    }

    public AssetTransfer() {
        objectMapper.registerModule(new JavaTimeModule());
    }

    // @Transaction(intent = Transaction.TYPE.EVALUATE)
    // public boolean exists(final Context context, final String chainCodeName, final String channelName, final String ownerId, final String id) throws JsonProcessingException {
    //     ChaincodeStub stub = context.getStub();
    //     return Boolean.valueOf(stub.invokeChaincodeWithStringArgs(chainCodeName, List.of("exists", ownerId, id), channelName).getStringPayload());
    // }

    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public String read(final Context context, final String chainCodeName, final String channelName, final String ownerId, final String id) throws JsonProcessingException {
        ChaincodeStub stub = context.getStub();
        return stub.invokeChaincodeWithStringArgs(chainCodeName, List.of("read", ownerId, id), channelName).getStringPayload();
    }

    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public String getAll(final Context context, final String chainCodeName, final String channelName, final String ownerId) throws JsonProcessingException {
        ChaincodeStub stub = context.getStub();
        return stub.invokeChaincodeWithStringArgs(chainCodeName, List.of("getAll", ownerId), channelName).getStringPayload();
    }
}
