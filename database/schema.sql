set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."books" (
	"id" serial not null,
	"title" text not null,
	"author" text not null,
	"summary" text,
	"enjoyed" boolean,
	primary key ("id")
)
