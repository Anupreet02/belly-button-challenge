# belly-button-challenge

* [ ] Belly -Button-Challenge includes the dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

D3 library was used to read in samples.json from the url provided in the module.

1. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

* Use sample_values as the values for the bar chart.
* Use otu_ids as the labels for the bar chart.
* Use otu_labels as the hovertext for the chart.

2. create a buble chart that displays each sample

* Use otu_ids for the x values.
* Use sample_values for the y values.
* Use sample_values for the marker size.
* Use otu_ids for the marker colors.
* Use otu_labels for the text values

3. Display the sample's metadata, i.e., an individual's demographic information.

* Loop through each key-value pair from the metadata JSON object and create a text string.
* Append an html tag with that text to the #sample-metadata panel.
* After updating the metadata demographic info inculdes :- ID,ETHNICITY,GENDER,AGE,LOCATION,BBTYPE,WFREQ rows in a box.

4. updated all the plots which were created such as : horizontal  bar chart, bubble chart and demographic info in the dashboard.

* [ ] References:- Class Recordings : Zoom cloud
