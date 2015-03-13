create table UserConnection (
    userId varchar(255) not null,
	providerId varchar(255) not null,
	providerUserId varchar(255),
	rank int not null,
	displayName varchar(255),
	profileUrl varchar(512),
	imageUrl varchar(512),
	accessToken varchar(255) not null,
	secret varchar(255),
	refreshToken varchar(255),
	expireTime bigint,
	primary key (userId, providerId, providerUserId)
);

	create unique index UserConnectionRank on UserConnection(userId, providerId, rank);
	
create table user (
	id bigint not null auto_increment,
	email varchar(255),
	first_name varchar(255),
	last_name varchar(255),
	nick_name varchar(255),
	password varchar(255),
	username varchar(255),
	primary key (id)
);
