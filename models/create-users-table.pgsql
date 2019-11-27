CREATE DATABASE digi_users;
\c digi_users

CREATE TABLE users (
    id integer NOT NULL,
    user_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_encrypted character varying(255) NOT NULL,
    password_salt character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE users_id_seq OWNED BY users.id;

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_name_key UNIQUE (user_name);