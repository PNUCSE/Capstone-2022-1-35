package com.aomd.chaincodeexcutor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedList;

@RestController
@RequestMapping("/api/shell")
@Slf4j
public class ShellAwardController extends ShellController {
    @GetMapping("/awards")
    public ResponseEntity<String> postAwardGetAll(
        @RequestParam("memberId") String memberId
    ) {
        ArrayList<String> args = new ArrayList<>();
        args.add(String.format("chaincode/%s.sh", "award"));
        args.add("getAll");
        args.add(memberId);
        return postGetAll(args);
    }

    @GetMapping("/award/{id}")
    public ResponseEntity<String> postAwardRead(
        @PathVariable("id") String awardId,
        @RequestParam("memberId") String memberId
    ) {
        ArrayList<String> args = new ArrayList<>();
        args.add(String.format("chaincode/%s.sh", "award"));
        args.add("read");
        args.add(memberId);
        args.add(awardId);

        log.info(args.toString());
        return postRead(args);
    }

    @PostMapping("/award/create")
    public ResponseEntity<String> postAwardCreate(@RequestBody PostAwardReadRequest postAwardReadRequest) {
        ArrayList<String> args = new ArrayList<>();
        args.add(String.format("chaincode/%s.sh", "award"));
        args.add("create");
        args.add(postAwardReadRequest.getTitle());
        args.add(postAwardReadRequest.getOwnerId());
        args.add(postAwardReadRequest.getPublisherId());
        args.add(postAwardReadRequest.getPublishedAt());
        args.add(postAwardReadRequest.getRank());

        log.info(args.toString());
        return postCreate(args);
    }

    @GetMapping("/award/{id}/exist")
    public ResponseEntity<String> postAwardExists(@PathVariable("id") String awardId) {
        ArrayList<String> args = new ArrayList<>();
        args.add(String.format("chaincode/%s.sh", "award"));
        args.add("exists");
        args.add(awardId);

        log.info(args.toString());
        return postExists(args);
    }

    private static class PostAwardReadRequest extends CommonPostCreateRequest {
        private String rank;

        public String getRank() {
            return rank;
        }
    }
}
