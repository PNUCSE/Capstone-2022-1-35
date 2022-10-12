package org.hyperledger.fabric.samples.assettransfer;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.hyperledger.fabric.contract.annotation.DataType;
import org.hyperledger.fabric.contract.annotation.Property;

import java.time.LocalDateTime;
import java.util.Objects;

@DataType
public final class Education{
    @Property
    private String id;
    @Property
    private String title;
    @Property
    private String ownerId;
    @Property
    private String publisher;
    @Property
    private LocalDateTime publishedAt;
    @Property
    private LocalDateTime createdAt;
    @Property
    private String state;
    @Property
    private String departmentInfo;

    public Education(
            @JsonProperty("id") String id,
            @JsonProperty("title") String title,
            @JsonProperty("ownerId") String ownerId,
            @JsonProperty("publisher") String publisher,
            @JsonProperty("publishedAt") LocalDateTime publishedAt,
            @JsonProperty("createdAt") LocalDateTime createdAt,
            @JsonProperty("state") String state,
            @JsonProperty("departmentInfo") String departmentInfo
    ) {
        this.id = id;
        this.title = title;
        this.ownerId = ownerId;
        this.publisher = publisher;
        this.publishedAt = publishedAt;
        this.createdAt = createdAt;
        this.state = state;
        this.departmentInfo = departmentInfo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Education education = (Education) o;
        return id.equals(education.id) && 
            title.equals(education.title) && 
            ownerId.equals(education.ownerId) &&
            publisher.equals(education.publisher) && 
            publishedAt.equals(education.publishedAt) && 
            createdAt.equals(education.createdAt) &&
            state.equals(education.state) && 
            departmentInfo.equals(education.departmentInfo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, ownerId, publisher, publishedAt, createdAt, state, departmentInfo);
    }

    @Override
    public String toString() {
        return "Education{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", ownerId=" +ownerId +
                ", publisher='" + publisher + '\'' +
                ", publishedAt=" + publishedAt +
                ", createdAt=" + createdAt +
                ", state='" + state + '\'' +
                ", departmentInfo='" + departmentInfo + '\'' +
                '}';
    }
    public String getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }
    public String getOwnerId() {
        return ownerId;
    }
    public String getPublisher() {
        return publisher;
    }
    @JsonSerialize(using = CustomLocalDateTimeSerializer.class)
    @JsonDeserialize(using = CustomLocalDateTimeDeSerializer.class)
    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }
    @JsonSerialize(using = CustomLocalDateTimeSerializer.class)
    @JsonDeserialize(using = CustomLocalDateTimeDeSerializer.class)
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public String getState() {
        return state;
    }
    public String getDepartmentInfo() {
        return departmentInfo;
    }
}
