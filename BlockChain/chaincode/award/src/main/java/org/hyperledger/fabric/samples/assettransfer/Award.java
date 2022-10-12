package org.hyperledger.fabric.samples.assettransfer;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.hyperledger.fabric.contract.annotation.DataType;
import org.hyperledger.fabric.contract.annotation.Property;

import java.time.LocalDateTime;
import java.util.Objects;

@DataType
public final class Award {
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
    private String rank;

    public Award(
            @JsonProperty("id") final String id,
            @JsonProperty("title") final String title,
            @JsonProperty("ownerId") final String ownerId,
            @JsonProperty("publisher") final String publisher,
            @JsonProperty("publishedAt") final LocalDateTime publishedAt,
            @JsonProperty("createdAt") final LocalDateTime createdAt,
            @JsonProperty("rank") final String rank
    ) {
        this.id = id;
        this.title = title;
        this.ownerId = ownerId;
        this.publisher = publisher;
        this.publishedAt = publishedAt;
        this.createdAt = createdAt;
        this.rank = rank;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Award award = (Award) o;
        return id.equals(award.id) && 
            title.equals(award.title) && 
            ownerId.equals(award.ownerId) &&
            publisher.equals(award.publisher) && 
            publishedAt.equals(award.publishedAt) && 
            createdAt.equals(award.createdAt) &&
            rank.equals(award.rank);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, ownerId, publisher, publishedAt, createdAt, rank);
    }

    @Override
    public String toString() {
        return "Award{"
                + "id='"
                + id
                + '\''
                + ", title='"
                + title
                + '\''
                + ", ownerId="
                + ownerId
                + ", publisher='"
                + publisher
                + '\''
                + ", publishedAt="
                + publishedAt
                + ", createdAt="
                + createdAt
                + ", rank='"
                + rank
                + '\''
                + '}';
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
    public String getRank() {
        return rank;
    }
}
