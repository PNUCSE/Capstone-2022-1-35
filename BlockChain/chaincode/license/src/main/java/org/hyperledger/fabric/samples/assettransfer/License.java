package org.hyperledger.fabric.samples.assettransfer;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.hyperledger.fabric.contract.annotation.DataType;
import org.hyperledger.fabric.contract.annotation.Property;

import java.time.LocalDateTime;
import java.util.Objects;

@DataType
public final class License {
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
    private String description;
    @Property
    private LocalDateTime expireDate;
    @Property
    private String qualificationNumber;
    

    public License(
            @JsonProperty("id") String id,
            @JsonProperty("title") String title,
            @JsonProperty("ownerId") String ownerId,
            @JsonProperty("publisher") String publisher,
            @JsonProperty("publishedAt") LocalDateTime publishedAt,
            @JsonProperty("createdAt") LocalDateTime createdAt,
            @JsonProperty("description") String description,
            @JsonProperty("expireDate") LocalDateTime expireDate,
            @JsonProperty("qualificationNumber") String qualificationNumber
    ) {
        this.id = id;
        this.title = title;
        this.ownerId = ownerId;
        this.publisher = publisher;
        this.publishedAt = publishedAt;
        this.createdAt = createdAt;
        this.description = description;
        this.expireDate = expireDate;
        this.qualificationNumber = qualificationNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        License license = (License) o;
        return id.equals(license.id) && 
            title.equals(license.title) && 
            ownerId.equals(license.ownerId) && 
            publisher.equals(license.publisher) && 
            publishedAt.equals(license.publishedAt) && 
            createdAt.equals(license.createdAt) && 
            description.equals(license.description) && 
            expireDate.equals(license.expireDate) && 
            qualificationNumber.equals(license.qualificationNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, ownerId, publisher, publishedAt, createdAt, description, expireDate, qualificationNumber);
    }

    @Override
    public String toString() {
        return "License{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", ownerId=" + ownerId +
                ", publisher='" + publisher + '\'' +
                ", publishedAt=" + publishedAt +
                ", createdAt=" + createdAt +
                ", description='" + description + '\'' +
                ", expireDate=" + expireDate +
                ", qualificationNumber='" + qualificationNumber + '\'' +
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
    public String getDescription() {
        return description;
    }
    @JsonSerialize(using = CustomLocalDateTimeSerializer.class)
    @JsonDeserialize(using = CustomLocalDateTimeDeSerializer.class)
    public LocalDateTime getExpireDate() {
        return expireDate;
    }
    public String getQualificationNumber() {
        return qualificationNumber;
    }
}
