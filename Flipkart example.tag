https://www.flipkart.com/search?q=mackbook&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off
wait 2
// read /html/body/div[2]/div[3]/div[1]/div[2]/div[3]/h1 to title
 
//echo "title = " + title
Title = "Macbook result"
csv_header = '"No","Title"\r\n'
dump csv_header to FLIPKART.csv


for (n=1; n<=10; n++)
{

	read (//div[@class="_3wU53n"])['+n+'] to book	
	echo  `book`
	
	read (//div[@class="_1vC4OE _2rQ-NK"])['+n+'] to price	
	echo `price`	
    
//	read(//div[@class="_1vC4OE _2rQ-NK"]) ['+n+'] to price
//	echo "price = " + price
	
	record = '"' + n + '","' + book + '","' + price + '"'	
	
//	record = '"' + n + '","' + book + '"'
	write `record` to FLIPKART.csv

}