SELECT * FROM sakila.actor;
/*1A*/
SELECT DISTINCT first_name, last_name FROM sakila.actor;
/*1B*/
SELECT CONCAT(first_name, ' ', last_name) AS 'Actor Name' FROM sakila.actor;
/*2A*/
SELECT actor_id, first_name, last_name
	FROM sakila.actor 
	WHERE first_name LIKE 'Joe%';
/*SELECT actor_id, first_name, last_name
	FROM sakila.actor 
	WHERE first_name='Joe'*/
/*2B*/    
SELECT actor_id, first_name, last_name
	FROM sakila.actor 
	WHERE last_name LIKE '%gen%';
/*2C*/
SELECT actor_id, first_name, last_name
	FROM sakila.actor 
	WHERE last_name LIKE '%li%'
    ORDER BY last_name, first_name ASC;
/*2D*/
SELECT country_id, country
	FROM sakila.country 
	WHERE country IN ('Afghanistan', 'Bangladesh', 'China');
/*3A*/
ALTER TABLE sakila.actor ADD Description BLOB;  
/*3B*/
ALTER TABLE sakila.actor DROP COLUMN Description;
/*4A*/
SELECT last_name
      ,COUNT(*) AS TotalCount
	FROM sakila.actor
	GROUP BY last_name;
/*4B*/
SELECT last_name,COUNT(*) AS TotalCount
	FROM sakila.actor
    GROUP BY last_name
    HAVING COUNT(*)>=2;
/*4C*/
UPDATE sakila.actor
	SET first_name='HARPO'
	WHERE first_name='GROUCHO'AND last_name='WILLIAMS';
/*4D*/
UPDATE sakila.actor
	SET first_name='GROUCHO'
	WHERE first_name='HARPO'AND last_name='WILLIAMS';
/*5A*/
DESCRIBE sakila.address;
/*6A*/
SELECT st.first_name, st.last_name, ad.address
	FROM sakila.staff st LEFT JOIN sakila.address ad ON st.address_id = ad.address_id;
/*6B*/
SELECT st.first_name, st.last_name, SUM(p.amount) AS 'TOTAL'
	FROM sakila.staff st LEFT JOIN sakila.payment p  ON st.staff_id = p.staff_id
	GROUP BY st.first_name, st.last_name;
/*6C*/
SELECT film.title, COUNT(fa.actor_id) AS 'TOTAL'
	FROM sakila.film film LEFT JOIN sakila.film_actor  fa ON film.film_id = fa.film_id
	GROUP BY film.title;
/*6D*/
SELECT film.title, COUNT(fa.actor_id) AS 'TOTAL'
	FROM sakila.film film LEFT JOIN sakila.film_actor  fa ON film.film_id = fa.film_id
	WHERE film.title='Hunchback Impossible';
/*6E*/
SELECT cust.first_name, cust.last_name, SUM(p.amount) AS 'TOTAL'
	FROM sakila.customer cust LEFT JOIN sakila.payment p ON cust.customer_id = p.customer_id
	GROUP BY cust.first_name, cust.last_name
	ORDER BY cust.last_name;
/*7A*/
SELECT title 
	FROM sakila.film 
	WHERE title LIKE 'K%' OR title LIKE 'Q%' 
	AND language_id
    IN (
		SELECT language_id
        FROM sakila.language
        WHERE name='English'
		);
/*7B*/
SELECT first_name, last_name
	FROM sakila.actor
	WHERE actor_id
	IN (
		SELECT actor_id FROM sakila.film_actor WHERE film_id 
		IN (
			SELECT film_id FROM sakila.film WHERE title='ALONE TRIP'
            )
		);
/*7C*/
SELECT first_name, last_name, email 
	FROM sakila.customer cust
	JOIN sakila.address ad ON (cust.address_id = ad.address_id)
	JOIN sakila.city cit ON (ad.city_id=cit.city_id)
	JOIN sakila.country coun ON (cit.country_id=coun.country_id);
/*7D*/
SELECT title 
	FROM sakila.film film
	JOIN sakila.film_category fcat on (film.film_id=fcat.film_id)
	JOIN sakila.category cate on (fcat.category_id=cate.category_id);
/*7E*/
SELECT title, COUNT(film.film_id) AS 'Count_of_Rented_Movies'
	FROM  sakila.film film
	JOIN sakila.inventory inv ON (film.film_id= inv.film_id)
	JOIN sakila.rental rent ON (inv.inventory_id=rent.inventory_id)
	GROUP BY title ORDER BY Count_of_Rented_Movies DESC;
/*7F*/
SELECT stf.store_id, SUM(p.amount) 
	FROM sakila.payment p
	JOIN sakila.staff stf ON (p.staff_id=stf.staff_id)
	GROUP BY store_id;
/*7G*/
SELECT store_id, city, country 
	FROM sakila.store st
	JOIN sakila.address ad ON (st.address_id=ad.address_id)
	JOIN sakila.city city ON (ad.city_id=city.city_id)
	JOIN sakila.country coun ON (city.country_id=coun.country_id);
/*7H*/
SELECT cat.name AS 'Top Five', SUM(p.amount) AS 'Gross' 
	FROM sakila.category cat
	JOIN sakila.film_category filmcat ON (cat.category_id=filmcat.category_id)
	JOIN sakila.inventory inv ON (filmcat.film_id=inv.film_id)
	JOIN sakila.rental rent ON (inv.inventory_id=rent.inventory_id)
	JOIN sakila.payment p ON (rent.rental_id=p.rental_id)
	GROUP BY cat.name ORDER BY Gross  LIMIT 5;
/*8A*/
CREATE VIEW sakila.Top_Five AS
	SELECT cat.name AS 'Top Five', SUM(p.amount) AS 'Gross' 
		FROM sakila.category cat
		JOIN sakila.film_category filmcat ON (cat.category_id=filmcat.category_id)
		JOIN sakila.inventory inv ON (filmcat.film_id=inv.film_id)
		JOIN sakila.rental rent ON (inv.inventory_id=rent.inventory_id)
		JOIN sakila.payment p ON (rent.rental_id=p.rental_id)
		GROUP BY cat.name ORDER BY Gross  LIMIT 5;
/*8B*/
SELECT * FROM sakila.Top_Five;
/*8C*/
DROP VIEW sakila.Top_Five; 