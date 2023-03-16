\encoding UTF8

/*
DROP DATABASE the_butterfly_interest_list;
CREATE DATABASE the_butterfly_interest_list;

\c the_butterfly_interest_list
*/

DROP TABLE IF EXISTS list_item;
CREATE TABLE list_item (
  list_item_id SERIAL PRIMARY KEY,
  anime_id INT NOT NULL,
  manga_id INT NOT NULL
);

DROP TABLE IF EXISTS anime_list;
CREATE TABLE anime_list (
  anime_id SERIAL PRIMARY KEY,
  anime_name TEXT NOT NULL,
  studio TEXT NOT NULL,
  genre TEXT NOT NULL,
  personal_rating TEXT NOT NULL,
  synopsis TEXT NOT NULL
);

DROP TABLE IF EXISTS manga_list;
CREATE TABLE manga_list (
  manga_id SERIAL PRIMARY KEY,
  manga_name TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT NOT NULL,
  personal_rating TEXT NOT NULL,
  synopsis TEXT NOT NULL
);

DROP TABLE IF EXISTS account;
CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  account_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest TEXT NOT NULL
);

DROP TABLE IF EXISTS contact;
CREATE TABLE contact (
  contact_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL
);

INSERT INTO anime_list (anime_name, studio, genre, personal_rating, synopsis)
  VALUES
 ('Fullmetal Alchemist: Brotherhood', 'Bones', 'Action', '8/10', 'After a horrific alchemy experiment goes wrong in the Elric household,
brothers Edward and Alphonse are left in a catastrophic new reality.
Ignoring the alchemical principle banning human transmutation,
the boys attempted to bring their recently deceased mother back to life.
Instead, they suffered brutal personal loss:
Alphonse''s body disintegrated while Edward lost a leg and then sacrificed an arm to keep Alphonse''s soul in the physical realm by binding it to a hulking suit of armor.
The brothers are rescued by their neighbor Pinako Rockbell and her granddaughter Winry.
Known as a bio-mechanical engineering prodigy, Winry creates prosthetic limbs for Edward by utilizing
"automail," a tough, versatile metal used in robots and combat armor.
After years of training, the Elric brothers set off on a quest to restore their bodies by locating the
Philosopher''s Stone-a powerful gem that allows an alchemist to defy the traditional laws of Equivalent Exchange.
As Edward becomes an infamous alchemist and gains the nickname "Fullmetal," the boys'' journey embroils them in a growing conspiracy that threatens the fate of the world.');
INSERT INTO anime_list (anime_name, studio, genre, personal_rating, synopsis)
  VALUES
 ('Bleach: Sennen Kessen-hen', 'Pierrot', 'Action', '10/10', 'Substitute Soul Reaper Ichigo Kurosaki spends his days fighting against Hollows,
dangerous evil spirits that threaten Karakura Town.
Ichigo carries out his quest with his closest allies:
Orihime Inoue, his childhood friend with a talent for healing;
Yasutora Sado, his high school classmate with superhuman strength; and Uryuu Ishida, Ichigo''s Quincy rival.
Ichigo''s vigilante routine is disrupted by the sudden appearance of Asguiaro Ebern,
a dangerous Arrancar who heralds the return of Yhwach, an ancient Quincy king.
Yhwach seeks to reignite the historic blood feud between Soul Reaper and Quincy,
and he sets his sights on erasing both the human world and the Soul Society for good.
Yhwach launches a two-pronged invasion into both the Soul Society and Hueco Mundo,
the home of Hollows and Arrancar. In retaliation, Ichigo and his friends must fight alongside old allies
and enemies alike to end Yhwach''s campaign of carnage before the world itself comes to an end.');
INSERT INTO anime_list (anime_name, studio, genre, personal_rating, synopsis)
  VALUES
 ('Steins;Gate', 'White Fox', 'Drama', '9/10', 'Eccentric scientist Rintarou Okabe has a never-ending thirst for scientific exploration.
Together with his ditzy but well-meaning friend Mayuri Shiina and his roommate Itaru Hashida,
Rintarou founds the Future Gadget Laboratory in the hopes of creating technological innovations that baffle the human psyche.
Despite claims of grandeur, the only notable "gadget" the trio have created is a microwave that has the mystifying power to turn bananas into green goo.
However, when Rintarou decides to attend neuroscientist Kurisu Makise''s conference on time travel,
he experiences a series of strange events that lead him to believe that there is more to the "Phone Microwave" gadget than meets the eye.
Apparently able to send text messages into the past using the microwave, Rintarou dabbles further with the "time machine,"
attracting the ire and attention of the mysterious organization SERN.
Due to the novel discovery, Rintarou and his friends find themselves in an ever-present danger.
As he works to mitigate the damage his invention has caused to the timeline,
he is not only fighting a battle to save his loved ones, but also one against his degrading sanity.');
INSERT INTO anime_list (anime_name, studio, genre, personal_rating, synopsis)
  VALUES
 ('Gintama', 'Bandai Namco Pictures', 'Action', '7/10', 'Gintoki, Shinpachi, and Kagura
return as the fun-loving but broke members of the Yorozuya team! Living in an alternate-reality Edo,
where swords are prohibited and alien overlords have conquered Japan, they try to thrive on doing whatever work they can get their hands on.
However, Shinpachi and Kagura still haven''t been paid... Does Gin-chan really spend all that cash playing pachinko?
Meanwhile, when Gintoki drunkenly staggers home one night, an alien spaceship crashes nearby.
A fatally injured crew member emerges from the ship and gives Gintoki a strange, clock-shaped device, warning him that it is incredibly powerful and must be safeguarded.
Mistaking it for his alarm clock, Gintoki proceeds to smash the device the next morning and suddenly discovers that the world outside his apartment has come to a standstill.
With Kagura and Shinpachi at his side, he sets off to get the device fixed; though, as usual, nothing is ever that simple for the Yorozuya team.
Filled with tongue-in-cheek humor and moments of heartfelt emotion, Gintama''s fourth season finds Gintoki
and his friends facing both their most hilarious misadventures and most dangerous crises yet.');
INSERT INTO anime_list (anime_name, studio, genre, personal_rating, synopsis)
  VALUES
 ('Kaguya-sama wa Kokurasetai: Ultra Romantic', 'A-1 Pictures', 'Comedy', '6/10', 'The elite members of Shuchiin Academy''s student council
continue their competitive day-to-day antics. Council president Miyuki Shirogane clashes daily against vice-president Kaguya Shinomiya,
each fighting tooth and nail to trick the other into confessing their romantic love. Kaguya struggles within the strict confines of her wealthy,
uptight family, rebelling against her cold default demeanor as she warms to Shirogane and the rest of her friends.
Meanwhile, council treasurer Yuu Ishigami suffers under the weight of his hopeless crush on Tsubame Koyasu, a popular upperclassman who helps to instill a new confidence in him.
Miko Iino, the newest student council member, grows closer to the rule-breaking Ishigami while striving to overcome her own authoritarian moral code.
As love further blooms at Shuchiin Academy, the student council officers drag their outsider friends into increasingly comedic conflicts.');

INSERT INTO manga_list (manga_name, author, genre, personal_rating, synopsis)
  VALUES
 ('Berserk','Kentaro Miura', 'Action', '10/10', 'Guts, a former mercenary now known as the "Black Swordsman," is out for revenge.
After a tumultuous childhood, he finally finds someone he respects and believes he can trust,
only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires.
Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings.
Setting out on a dreadful quest riddled with misfortune, Guts, armed with a massive sword and monstrous strength,
will let nothing stop him, not even death itself, until he is finally able to take the head of the one who stripped him-and his loved one-of their humanity.');
INSERT INTO manga_list (manga_name, author, genre, personal_rating, synopsis)
  VALUES
 ('JoJo no Kimyou na Bouken Part 7: Steel Ball Run', 'Hirohiko Araki', 'Action', '6/10', 'In the American Old West, the world''s greatest race is about to begin.
Thousands line up in San Diego to travel over six thousand kilometers for a chance to win the grand prize of fifty million dollars.
With the era of the horse reaching its end, contestants are allowed to use any kind of vehicle they wish.
Competitors will have to endure grueling conditions, traveling up to a hundred kilometers a day through uncharted wastelands.
The Steel Ball Run is truly a one-of-a-kind event.
The youthful Johnny Joestar, a crippled former horse racer, has come to San Diego to watch the start of the race.
There he encounters Gyro Zeppeli, a racer with two steel balls at his waist instead of a gun.
Johnny witnesses Gyro using one of his steel balls to unleash a fantastical power, compelling a man to fire his gun at himself during a duel.
In the midst of the action, Johnny happens to touch the steel ball and feels a power surging through his legs, allowing him to stand up for the first time in two years.
Vowing to find the secret of the steel balls, Johnny decides to compete in the race, and so begins his bizarre adventure across America on the Steel Ball Run.');
INSERT INTO manga_list (manga_name, author, genre, personal_rating, synopsis)
  VALUES
 ('One Piece', 'Eiichiro Oda', 'Action', '8/10', 'Gol D. Roger, a man referred to as the "Pirate King,"
is set to be executed by the World Government. But just before his demise, he confirms the existence of a great treasure, One Piece,
located somewhere within the vast ocean known as the Grand Line.
Announcing that One Piece can be claimed by anyone worthy enough to reach it, the Pirate King is executed and the Great Age of Pirates begins.
Twenty-two years later, a young man by the name of Monkey D. Luffy is ready to embark on his own adventure, searching for One Piece and striving to become the new Pirate King.
Armed with just a straw hat, a small boat, and an elastic body,
he sets out on a fantastic journey to gather his own crew and a worthy ship that will take them across the Grand Line to claim the greatest status on the high seas.');
INSERT INTO manga_list (manga_name, author, genre, personal_rating, synopsis)
  VALUES
 ('Vagabond', 'Takehiko Inoue', 'Action', '9/10', 'In 16th-century Japan, Shinmen Takezou is a wild, rough young man, in both his appearance and his actions.
His aggressive nature has won him the collective reproach and fear of his village, leading him and his best friend, Matahachi Honiden,
to run away in search of something grander than provincial life. The pair enlist in the Toyotomi army,
yearning for glory—but when the Toyotomi suffer a crushing defeat at the hands of the Tokugawa Clan at the Battle of Sekigahara, the friends barely make it out alive.
After the two are separated, Shinmen returns home on a self-appointed mission to notify the Hon''iden family of Matahachi''s survival.
He instead finds himself a wanted criminal, framed for his friend''s supposed murder based on his history of violence.
Upon being captured, he is strung up on a tree and left to die. An itinerant monk, the distinguished Takuan Soho,
takes pity on the "devil child," secretly freeing Shinmen and christening him with a new name to avoid pursuit by the authorities: Musashi Miyamoto.
Vagabond is the fictitious retelling of the life of one of Japan''s most renowned swordsmen,
the "Sword Saint" Musashi Miyamoto-his rise from a swordsman with no desire other than to become "Invincible Under the Heavens"
to an enlightened warrior who slowly learns of the importance of close friends, self-reflection, and life itself.');
INSERT INTO manga_list (manga_name, author, genre, personal_rating, synopsis)
  VALUES
 ('Monster', 'Naoki Urasawa', 'Drama', '7/10', 'Kenzou Tenma, a renowned Japanese neurosurgeon working in post-war Germany, faces a difficult choice:
to operate on Johan Liebert, an orphan boy on the verge of death, or on the mayor of Dusseldorf.
In the end, Tenma decides to gamble his reputation by saving Johan, effectively leaving the mayor for dead.
As a consequence of his actions, hospital director Heinemann strips Tenma of his position, and Heinemann''s daughter Eva breaks off their engagement.
Disgraced and shunned by his colleagues, Tenma loses all hope of a successful career-that is, until the mysterious killing of Heinemann gives him another chance.
Nine years later, Tenma is the head of the surgical department and close to becoming the director himself.
Although all seems well for him at first, he soon becomes entangled in a chain of gruesome murders that have taken place throughout Germany.
The culprit is a monster-the same one that Tenma saved on that fateful day nine years ago.');
