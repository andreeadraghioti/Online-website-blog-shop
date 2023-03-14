DROP TYPE IF EXISTS categ_produse;
DROP TYPE IF EXISTS tipuri_produse;

CREATE TYPE categ_produse AS ENUM( 'fiction', 'nonfiction', 'journal', 'kids', 'written by me','other');
CREATE TYPE tipuri_produse AS ENUM('book', 'map');


CREATE TABLE IF NOT EXISTS produse (
   id serial PRIMARY KEY,
   title VARCHAR(100) UNIQUE NOT NULL,
   author TEXT,
   about TEXT,
   price NUMERIC(8,2) NOT NULL,  
   product_type tipuri_produse DEFAULT 'book',
   category categ_produse DEFAULT 'fiction',
   imagine VARCHAR(300),
   adding_date TIMESTAMP DEFAULT current_timestamp
);

INSERT into produse (title, author, about,price, product_type, category, imagine) VALUES 
('Travel with children: Family-Friendly Travel Without The Fuss', 'Lonely Planet', 'This updated version of Travel With Children offers you the most comprehensive advice for taking your family on the road, and now adds hundreds of destination ideas backed up by great photography and practical itineraries. Assembled by Lonely Planet team of travel-savvy parent experts, family travellers can rely on insights and advice on choosing the right trip, healthy travel, travelling with teens and much more.', 18.93 , 'book', 'nonfiction', 'p1.jpg'),

('The Cat Who Went To Paris', 'Peter Gethers', 'For the wary soul who needs a bit of extra convincing of the life-changing wonders that await abroad, there’s perhaps no better resource than The Cat Who Went To Paris. Peter Gethers’ global journeys with a cat named Norton puts a dose of adorable humor into many common travel situations.',16.00, 'book', 'nonfiction', 'p2.jpg'),

('World Travel: An Irreverent Guide', 'Anthony Bourdain', 'If you are a fan of Anthony Bourdain, you will know that he spent a lot of his time in some of the world’s most fascinating places. He traveled from his hometown of New York to Tanzania and everywhere in between, soaking in every experience he could get his hands on. ‘World Travel: An Irreverent Guide’ is a collection of Bourdain’s journeys, injected with his famous frank and honest tone of voice. The book also includes essays written by his friends and family that will bring you even deeper into his stories.',19.60, 'book', 'nonfiction', 'p3.jpg'),

('Bad Lands: A Tourist On The Axis Of Evil', 'Tony Wheeler', 'Bad Lands author Tony Wheeler, has a fantastic way with words, as he details his travels through destinations that are often described as some of the most repressive and dangerous countries in the world. With stories about Afghanistan, Cuba, Iraq, Libya, North Korea and many more, Wheeler explores each country’s attitude towards human rights, terrorism and foreign policy.',7.34, 'book', 'nonfiction', 'p4.jpg'),

('Amazing World Atlas: Bringing the World to Life', 'Lonely Planet', 'Finally, Lonely Planet has made the Atlas kids have been waiting for! With 160 pages of illustrated maps, engaging infographics, mind-blowing photography and a large dose of humour, this is the atlas that shows kids what the world is really like. Touching on popular culture, sports and school life, this will bring the world to life for kids aged 8 and up.',15.53, 'book', 'nonfiction', 'p5.jpg'),

('The Geography of Bliss', 'Eric Weiner', 'When Eric Weiner took a deep dive into the worlds data on happiness, he discovered that there are many other countries doing a much better job of keeping their population happy and content in their day to day lives. Traveling from America to India, with many stops along the way, Weiner documents his journey to investigate what true happiness is. This book is a wonderful combination of travel tales, science, data and psychology, mixed in with some of Erics famous sense of humour. In his search for answers, he will teach you the key takeaways from the world’s happiest nations.',37.30, 'book', 'nonfiction', 'p6.jpg'),

('Lands Of Lost Borders', 'Kate Harris', 'Lands Of Lost Borders, tells the adventurous tale of Kate Harris and her bicycle journey down the Silk Road. In between her studies at Oxford and MIT, Harris set off on an adventure with her childhood friend Mel. While they pedalled for miles on end, their journey takes them to some of the remotest places on earth. Her story is incredibly reflective of life and our connection to nature. It tackles the boundaries that we set ourselves and the importance of forging new paths, just like Marco Polo and Magellan did.',10.78, 'book', 'fiction', 'p7.jpg'),

('Wild', 'Cheryl Strayed', 'This modern day classic is based on Cheryl Strayed’s 1,100-mile solo hike through the Pacific Crest Trail. It all began at 22 years old with the passing of her mother, and her divorce from her husband, which found Strayed at the lowest point of her life. After a brief encounter with heroine, she makes the decision to rebuild her confidence, her self respect and her life. Starting in the Mojave Desert, she slowly finds her way through California and Oregon, facing every barrier that nature can throw at her, from snakes and black bears, to epic snow fall and sheer loneliness. This story perfectly captures the biggest journey of Strayed’s life.',6.99, 'book', 'nonfiction', 'p8.jpg'),

('Stranger On A Train', 'Jenny Diski', 'With the backdrop of two cross-country trips on Amtrak, Jenny Diski writes about her experience arriving into the heart of America, while still reflecting on the scars of her past. “I travel in order to keep still” she explains in this vivid travelogue/memoir, as she dives into American culture and the demons of her past, often in the same page. Diski’s story is both captivating and relatable at a human level.',16.25, 'book', 'fiction', 'p9.jpg'),

('TimeOut : Amsterdam', 'Time Out', 'Find out whats going on in Amsterdam, from the best restaurants and bars, clubs and the finest attractions and things to do.',5.60, 'book', 'nonfiction', 'p10.jpg'),

('TimeOut : New York', 'Time Out', 'Find out whats going on in New York, from the best restaurants and bars, clubs and the finest attractions and things to do.',5.60, 'book', 'nonfiction', 'p11.jpg'),

('DK Eyewitness Florence and Tuscany', 'DK Eyewitness', 'Whether you want to sample delicious Tuscan food and wine, gaze at the iconic Leaning Tower of Pisa or browse eclectic markets in Florence, your DK Eyewitness travel guide makes sure you experience all that this region has to offer.',15.66, 'book', 'nonfiction', 'p12.jpg'),

('The Rough Guide to Kenya', 'Rough Guides', 'Practical travel guide to Kenya featuring points-of-interest structured lists of all sights and off-the-beaten-track treasures, with detailed colour-coded maps, practical details about what to see and to do in Kenya. The Rough Guide to Kenya also includes details on how to get there and around, pre-departure information, as well as top time-saving tips, like a visual list of things not to miss in Kenya, expert author picks and itineraries to help you plan your trip.',10.99, 'book', 'nonfiction', 'p13.jpeg'),

('The Rough Guide to the 100 Best Places on Earth 2022', 'Rough Guides','The Rough Guide to the 100 Best Places on Earth 2022 is a celebration of the years most extraordinary places.',24.99, 'book', 'nonfiction', 'p14.jpeg'),

('Scratch the World black edition map print', 'Maps International', 'With its bronze tones, Scratch the World Black Edition map print is the perfect gift for the travel enthusiast. Scratch off your visited destinations to reveal the industrial styled, up-to-date map underneath.',15.99, 'map', 'other', 'p15.jpg'),

('Top 100 Places Poster', 'Enno Vatti', 'This ultimate travel bucket list contains 100 most beautiful places of all 7 continents - from unspoiled nature to historical ruins and futuristic cities.',18.99, 'map', 'other', 'p16.jpg'),

('Travel Planner', 'Clever Fox', 'Traveling is the best and most exciting way to make memories, broaden your horizons and achieve peace of mind. If you have been dreaming of new experiences and seeing the world, Clever Fox Travel Journal is the travel organizer for you!',22.99, 'book', 'journal', 'p17.jpg'),

('Travel Map Book', 'The Travel Map', 'Travel Map Book is a notebook with 9 mini-maps and set of checklists, and a great gift for every traveler. Plan your journey, take notes, use travel stickers and mark visited countries by erasing the golden scratch-off layer from mini-maps of each continent. Discover the whole world!',29.99, 'book', 'journal', 'p18.jpg'),

('Japan Tuttle Travel Pack: Your Guide to Japans Best Sights for Every Budget', 'Rob Goss', 'This is the book that gives you the best of the best! All sights in Japan Tuttle Travel Pack have been hand-picked by seasoned travel writer Rob Goss—who has been living in Japan for over a decade, visiting and writing about every corner of this fascinating country. Rob includes only the very best spots—places he goes back to again and again, and where he sends all his friends.',14.95, 'book', 'nonfiction', 'p19.jpg'),

('My Ultimate Travel Guide: A beginners travel guide', 'Marina D.', 'A comprehensive and practical book that provides essential tips and advice for novice travelers. From planning and packing to navigating new destinations, this guide offers step-by-step instructions and useful insights to make your first travel experiences enjoyable and stress-free. With personal anecdotes and expert recommendations, this book is the ultimate resource for anyone looking to embark on a new adventure.',24.99, 'book', 'written by me', 'p20.png'),

('Around the World: Discovering yourself with travelling', 'Marina D.', 'A thought-provoking book that explores the transformative power of travel. Through personal stories and introspective reflections, the author shares how travel can inspire personal growth and self-discovery. Whether its immersing oneself in new cultures, overcoming challenges, or embracing new perspectives, this book encourages readers to step out of their comfort zones and embark on their own journeys of self-exploration. With practical advice and inspirational insights, Around the World is a must-read for anyone seeking to expand their horizons and discover themselves through travel.',24.99, 'book', 'written by me', 'p21.png');
