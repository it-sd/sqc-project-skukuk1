\encoding UTF8

DROP DATABASE the_butterfly_interest_list;
CREATE DATABASE the_butterfly_interest_list;

\c the_butterfly_interest_list

DROP TABLE IF EXISTS list_item;
CREATE TABLE list_item (
  list_item_id SERIAL PRIMARY KEY,
  anime_id INT NOT NULL,
  manga_id INT NOT NULL
);

DROP TABLE IF EXISTS anime_list;
CREATE TABLE anime_list (
  anime_id SERIAL PRIMARY KEY,
  anime_name VARCHAR(25) NOT NULL,
  studio VARCHAR(25) NOT NULL,
  genre VARCHAR(25) NOT NULL,
  description TEXT NOT NULL,
  personal_rating TEXT NOT NULL
);

DROP TABLE IF EXISTS manga_list;
CREATE TABLE manga_list (
  manga_id SERIAL PRIMARY KEY,
  manga_name VARCHAR(25) NOT NULL,
  author VARCHAR(25) NOT NULL,
  genre VARCHAR(25) NOT NULL,
  description TEXT NOT NULL,
  personal_rating TEXT NOT NULL
);

INSERT INTO anime_list (anime_name, studio, genre, description, personal_rating) VALUES
  ('Cowboy Bebop', 'Sunrise', 'Sci-Fi', 'Crime is timeless. By the year 2071, humanity has expanded across the galaxy, filling the surface of other planets with settlements like those on Earth. These new societies are plagued by murder, drug use, and theft, and intergalactic outlaws are hunted by a growing number of tough bounty hunters.Spike Spiegel and Jet Black pursue criminals throughout space to make a humble living. Beneath his goofy and aloof demeanor, Spike is haunted by the weight of his violent past. Meanwhile, Jet manages his own troubled memories while taking care of Spike and the Bebop, their ship. The duo is joined by the beautiful con artist Faye Valentine, odd child Edward Wong Hau Pepelu Tivrusky IV, and Ein, a bioengineered Welsh Corgi. While developing bonds and working to catch a colorful cast of criminals, the Bebop crews lives are disrupted by a menace from Spikes past. As a rivals maniacal plot continues to unravel, Spike must choose between life with his newfound family or revenge for his old wounds.', '9/10');
INSERT INTO manga_list (manga_name, author, genre, description, personal_rating) VALUES
  ('Berserk','Kentaro Miura', 'Action', 'Guts, a former mercenary now known as the "Black Swordsman," is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings. Setting out on a dreadful quest riddled with misfortune, Guts, armed with a massive sword and monstrous strength, will let nothing stop him, not even death itself, until he is finally able to take the head of the one who stripped him—and his loved one—of their humanity.', '10/10');
