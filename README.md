# Security Incidents and Data Breaches
The goal of this project is to show the world in a clean and interactive way where security incidents and data breaches are happening, what industries they happen in and highlight where we could improve given the incident causes.

The D3 visualisation dashboard is hosted on [GitHub Pages](https://akhilmadineni.github.io/)

For product demonstraion click on show demo in the website.

# Acknowledgements 
- [D3](https://d3js.org/) by mbostock
- [D3-Legend](https://d3-legend.susielu.com/) by Susie Lu
- [D3-queue](https://github.com/d3/d3-queue) by mbostock
- [Datamaps](http://datamaps.github.io/) by Mark DiMarco
- [D3-collection](https://github.com/d3/d3-collection) by mbostock
- [TopoJSON](https://github.com/topojson/topojson) by mbostock
- [Select2](https://select2.org/) by Kevin Brown
- [Bootstrap](https://getbootstrap.com/) by 

**Table of Contents**
- Introduction
  - Problem Statement
  - Solution
  - Prerequisites

# Introduction
Computer and Network Security is important these days, we know that by now. But do we know just how many breaches are happening around
us and how big these breaches are? A year back, Equifax data breach which exposed the personal information of 145.5 million American
consumers. Computer related security incidents happen all the time and even the companies that were hired to protect us, sometimes 
forget to apply their own trade.

### Problem Statement
We often hear about companies being hacked in the news or another data breach that exposes sensitive personal information of a lot of
people. But do we know exactly how many times a data breach occurs or how big these breaches are in comparison to other security related
incidents? This project aims to answer those questions by visualizing where breaches are happening, how big they are, what kind of impact
they have and what type of attack can be held accountable for these leaks.

### Target Audience
Anyone that is (not yet) interested in computer or network security and wants to learn more about data breaches or security related incidents.
This visualization might specifically be interesting to IT personnel, Network Administrators, Cyber Security Specialists and the like to
create awareness among other employees to prevent these kind of incidents from happening. The ultimate goal is to inform everyone about
the risks of insecure appliances in this digital world so we can further prevent these incidents.

### Solution
A D3 dashboard that shows where security incidents are happening, in what industry they are happening, what kind of attacks are being performed,
which assets are being targeted and finally how this all changed over the years.

***Main Features***

- Interactive world map 

Shows all the countries in the world that you can hover over and click. On clicking a country the other 3 charts will update with the relevant data.

- Interactive horizontal bar chart

A horizontal bar chart that shows the amount of security incidents for a specific industry.

- Interactive heat map 

A heat map that shows the industries and what type of attack is dominant in that industry. User can also choose to show data for all the breaches or only the breaches which were confirmed to disclose data.

- Interactive pie chart 

A simple bar chart that distributes the incidents by targeted asset, what device/person got attacked?

- Dropdown menu: Year 

Shows data for the selected year or an aggregated view for all the years.

- Responsive website design 

### Prerequisites

**Data Sources**

For this project I'll be using: [The VERIS (Vocabulary for Event Recording and Incident sharing) Community Database](https://github.com/vz-risk/VCDB).
This is the only data source that I'll be needing to make my visualization as it is very complete containing information
on the victim, the actor, the attack and other details of the security incident. Even though it already comes in a ready
to use JSON format I might have to transform (text to numbers) or delete (incident summary) to make it usable and slim down
the file size.

# Authors

Akhil Madineni // [LinkedIn](https://www.linkedin.com/in/akhil-madineni-7a39ab155/)


