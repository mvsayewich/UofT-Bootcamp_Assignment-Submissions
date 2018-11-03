import os
import csv

# Path to collect data from the folder
electdata = os.path.join('election_data.csv')


total_votes_cast = 0
list_of_candidates = []
candidate_vote_counter = {}
winner_name = ""
winner_votes = 0 

# Read in the CSV file
with open(electdata, 'r', newline = '') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    #This skips the first row of the CSV file.
    next(csvreader, None)  

    for line in csvreader:
        #The total number of votes cast included in the dataset    
        total_votes_cast = total_votes_cast + 1
        
        #A complete list of candidates who received votes
        current_candidate = line[2]
        if current_candidate not in list_of_candidates:
            list_of_candidates.append(current_candidate)
            candidate_vote_counter[current_candidate] = 0
        else:
            candidate_vote_counter[current_candidate] = candidate_vote_counter[current_candidate] + 1    
        #print(list_of_candidates)    
        #The total number of votes each candidate won
        #print(candidate_vote_counter)


print(str(total_votes_cast) + " votes were cast.")
print("Here is our complete list of candidates:" + str(list_of_candidates))    
print("Here is the total of their votes: " + str(candidate_vote_counter))
print("Here is the list of candidates and their vote percentage:")        

for candidate in candidate_vote_counter:
        
    candidate_votes = candidate_vote_counter.get(candidate)
    #print(candidate_votes)
        
    print(candidate)
    percentageofvotes = ((candidate_votes / total_votes_cast) *100) 
    print(percentageofvotes)
        
    #The winner of the election based on popular vote
    if candidate_votes > winner_votes:
        winner_votes = candidate_votes
        winner_name = candidate
            
print("The winner of our election is: " + winner_name)

#Export a text file with the results
file = open("pypollscript.txt","w")
file.write("Poll Analysis"'\n'"--------------"'\n'
           + str(total_votes_cast) + " votes were cast." +
           '\n'"The list of candidates are + str(list_of_candidates)" +
           '\n'"Here is the total of their votes: " + str(candidate_vote_counter) +
           '\n'"The vote percentage for Khan was 63%, Correy was 20%, Li was 14% and O'Tooley was 3%." +
           '\n'"The winner of the election is: " + winner_name)
file.close()