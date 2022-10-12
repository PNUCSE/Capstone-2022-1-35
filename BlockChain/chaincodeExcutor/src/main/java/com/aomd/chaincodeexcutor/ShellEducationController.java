package com.aomd.chaincodeexcutor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedList;

@RestController
@RequestMapping("/api/shell")
@Slf4j
public class ShellEducationController extends ShellController {
    @GetMapping("/educations")
    public ResponseEntity<String> postAwardGetAll(
        @RequestParam("memberId") String memberId
    ) {
        ArrayList<String> args = new ArrayList<>();
        args.add(String.format("chaincode/%s.sh", "education"));
        args.add("getAll");
        args.add(memberId);
        return postGetAll(args);
    }

    @GetMapping("/education/{id}")
    public ResponseEntity<String> postAwardRead(
            @PathVariable("id") String educationId,
            @RequestParam("memberId") String memberId
    ) {
        ArrayList<String> args = new ArrayList<>();
        args.add(String.format("chaincode/%s.sh", "education"));
        args.add("read");
        args.add(memberId);
        args.add(educationId);

        log.info(args.toString());
        return postRead(args);
    }

    @PostMapping("/education/create")
    public ResponseEntity<String> postAwardCreate(@RequestBody PostAwardReadRequest postAwardReadRequest) {
        ArrayList<String> args = new ArrayList<>();
        args.add(String.format("chaincode/%s.sh", "education"));
        args.add("create");
        args.add(postAwardReadRequest.getTitle());
        args.add(postAwardReadRequest.getOwnerId());
        args.add(postAwardReadRequest.getPublisherId());
        args.add(postAwardReadRequest.getPublishedAt());
        args.add(postAwardReadRequest.getState());
        args.add(postAwardReadRequest.getDepartmentInfo());

        log.info(args.toString());
        return postCreate(args);
    }

    @GetMapping("/education/{id}/exist")
    public ResponseEntity<String> postAwardExists(@PathVariable("id") String educationId) {
        ArrayList<String> args = new ArrayList<>();
        args.add(String.format("chaincode/%s.sh", "education"));
        args.add("exists");
        args.add(educationId);

        log.info(args.toString());
        return postExists(args);
    }

    private static class PostAwardReadRequest extends CommonPostCreateRequest {
        private String state;
        private String departmentInfo;

        public String getState() {
            return state;
        }

        public String getDepartmentInfo() {
            return departmentInfo;
        }
    }
}
