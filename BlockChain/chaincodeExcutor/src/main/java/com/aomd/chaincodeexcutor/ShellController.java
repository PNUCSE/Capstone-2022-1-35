package com.aomd.chaincodeexcutor;

import org.springframework.http.ResponseEntity;

import java.io.*;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.Consumer;

public abstract class ShellController {
    private static class StreamGobbler implements Runnable {
        private InputStream inputStream;
        private Consumer<String> consumer;

        public StreamGobbler(InputStream inputStream, Consumer<String> consumer) {
            this.inputStream = inputStream;
            this.consumer = consumer;
        }

        @Override
        public void run() {
            new BufferedReader(new InputStreamReader(inputStream)).lines()
                    .forEach(consumer);
        }
    }

    private String executeShellScript(List<String> args) {
        try {
            ProcessBuilder builder = new ProcessBuilder();
            builder.command(args);
            builder.directory(new File(System.getProperty("user.dir")));

            Process process = builder.start();
            AtomicReference<String> ret = new AtomicReference<>();
            SequenceInputStream sequenceInputStream = new SequenceInputStream(process.getErrorStream(), process.getInputStream());
            StreamGobbler streamGobbler = new StreamGobbler(sequenceInputStream, ret::set);
            Executors.newSingleThreadExecutor().submit(streamGobbler).get();

            int exitCode = process.waitFor();
            assert exitCode == 0;

            return ret.get();
        } catch (Exception e) {
            e.printStackTrace();
            return e.toString();
        }
    }

    protected ResponseEntity<String> postGetAll(List<String> args) {
        String res = executeShellScript(args);
        return ResponseEntity.ok(res);
    }

    protected ResponseEntity<String> postRead(List<String> args) {
        String res = executeShellScript(args);
        if (res.contains("status:500")) {
            int s = res.indexOf("message:") + 9;
            int e = res.lastIndexOf("\"");
            return ResponseEntity.status(400).body(res.substring(s, e));
        }

        return ResponseEntity.ok(res);
    }

    protected ResponseEntity<String> postCreate(List<String> args) {
        String res = executeShellScript(args);
        if (res.contains("status:500")) {
            int s = res.indexOf("message:") + 9;
            int e = res.lastIndexOf("\"");
            return ResponseEntity.status(400).body(res.substring(s, e));
        }
        int s = res.indexOf("payload:\"") + 9;
        int e = res.lastIndexOf("\"");
        return ResponseEntity.ok(res.substring(s, e));
    }

    protected ResponseEntity<String> postExists(List<String> args) {
        String res = executeShellScript(args);
        return ResponseEntity.ok(res);
    }

    protected static class CommonPostCreateRequest {
        private String title;
        private String ownerId;
        private String publisherId;
        private String publishedAt;

        public String getTitle() {
            return title;
        }

        public String getOwnerId() {
            return ownerId;
        }

        public String getPublisherId() {
            return publisherId;
        }

        public String getPublishedAt() {
            return publishedAt;
        }
    }
}