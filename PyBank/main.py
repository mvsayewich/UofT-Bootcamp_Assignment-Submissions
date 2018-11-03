import os
import csv

# Path to collect data from the folder
pybank = os.path.join('budget_data.csv')
    
# Read in the CSV file
with open(pybank, 'r', newline = '') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    #This skips the first row of the CSV file.
    next(csvreader, None)  
    months = 0
    total_profit = 0
    monthly_change = []
    pre_revenue = 0
    average_change = 0
    greatest_increase = 0
    greatest_month = ""
    lowest_increase = 0
    lowest_month = ""
    month = []
    amount = []
    output = ""
    for line in csvreader:
        month.append(line[0])
        amount.append(int(line[1])) 
        #print (line)
        #The total number of months included in the dataset
        #row_count = sum(1 for row in csvfile)
        months = months + 1
        #The total net amount of "Profit/Losses" over the entire period
        total_profit = total_profit + int(line[1])
        #The average change in "Profit/Losses" between months over the entire period
        diff = int(line[1]) - pre_revenue
        monthly_change.append(diff)
        #The greatest increase in profits (date and amount) over the entire period
        #greatest_increase = max(monthly_change) 
        #The greatest decrease in profits (date and amount) over the entire period
        #lowest_increase = min(monthly_change)
#The average change in "Profit/Losses" between months over the entire period
monthly_change = monthly_change[1:]
average_change = sum(monthly_change) / len(monthly_change)
#use the index value of greatest_increase to find the month
greatest_increase = max(amount)
greatest_month = month[amount.index(greatest_increase)] 
#use the index value of lowest_increase to find the month
lowest_increase = min(amount)
lowest_month = month[amount.index(lowest_increase)] 

print("Financial Analysis")
print("-----")
print("There are " + str(months) + " months in this dataset.")     
print("The total profits are $" + str(total_profit) + ".")
print("The average change is $" + str(average_change) + ".")
print("The greatest increase in profits is $" + str(greatest_increase) + " in " + (greatest_month) + ".")
print("The lowest increase in profits is $" + str(lowest_increase) + " in " + (lowest_month) + ".")

#Export a text file with the results
file = open("pybankscript.txt","w")
file.write("Financial Analysis"'\n' "-----" '\n'"There are " + str(months) + " months in this dataset."
          '\n' "The total profits are $" + str(total_profit) + "." '\n' "The average change is $" + str(average_change) + "."
          '\n'"The greatest increase in profits is $" + str(greatest_increase) + " in " + (greatest_month) + "." 
          '\n'"The lowest increase in profits is $" + str(lowest_increase) + " in " + (lowest_month) + ".")
file.close()
