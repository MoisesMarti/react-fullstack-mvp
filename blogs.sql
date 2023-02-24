DROP TABLE IF EXISTS blog_table;

create TABLE blog_table (
  blogs_id serial,
  blogs text
);

INSERT INTO blog_table (blogs) Values ('Today i took my react Assessment ')