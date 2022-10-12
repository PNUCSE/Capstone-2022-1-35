package com.aomd.chaincodeexcutor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedList;

@RestController
@RequestMapping("/api/shell")
@Slf4j
public class ShellLicenseController extends ShellController{
    @GetMapping("/licenses")
    public ResponseEntity<String> postAwardGetAll(
        @RequestParam("memberId") String memberId
    ) { 
        ArrayList<String> args = new ArrayList<>();
        args.add(String.format("chaincode/%s.sh", "license"));
        args.add("getAll");
        args.add(memberId);
        return postGetAll(args);
    }

    @GetMapping("/license/{id}")
    public ResponseEntity<String> postAwardRead(
            @PathVariable("id") String licenseId,
            @RequestParam("memberId") String memberId
    ) {
        ArrayList<String> args = new ArrayList<>();
        args.add(String.format("chaincode/%s.sh", "license"));
        args.add("read");
        args.add(memberId);
        args.add(licenseId);

        log.info(args.toString());
        return postRead(args);
    }

    @PostMapping("/license/create")
    public ResponseEntity<String> postAwardCreate(@RequestBody PostAwardReadRequest postAwardReadRequest) {
        ArrayList<String> args = new ArrayList<>();
        args.add(String.format("chaincode/%s.sh", "license"));
        args.add("create");
        args.add(postAwardReadRequest.getTitle());
        args.add(postAwardReadRequest.getOwnerId());
        args.add(postAwardReadRequest.getPublisherId());
        args.add(postAwardReadRequest.getPublishedAt());
        args.add(postAwardReadRequest.getDescription());
        args.add(postAwardReadRequest.getExpireDate());
        args.add(postAwardReadRequest.getQualificationNumber());

        log.info(args.toString());
        return postCreate(args);
    }

    @GetMapping("/license/{id}/exist")
    public ResponseEntity<String> postAwardExists(@PathVariable("id") String licenseId) {
        ArrayList<String> args = new ArrayList<>();
        args.add(String.format("chaincode/%s.sh", "license"));
        args.add("exists");
        args.add(licenseId);

        log.info(args.toString());
        return postExists(args);
    }

    private static class PostAwardReadRequest extends CommonPostCreateRequest {
        private String description;
        private String expireDate;
        private String qualificationNumber;

        public String getDescription() {
            return description;
        }

        public String getExpireDate() {
            return expireDate;
        }

        public String getQualificationNumber() {
            return qualificationNumber;
        }
    }
}
