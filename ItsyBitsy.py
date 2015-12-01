import win32com.client
import time
import os
import sys
import re

clear = lambda: os.system('cls')

wb = win32com.client.Dispatch("InternetExplorer.Application")
wb.Visible = 1
wb.Navigate("about:blank")

while (wb.busy): 
 time.sleep(5)

clear()

site = ''

while True:

 print("Welcome!")
 if not site:
  print("No website is currently selected")
 else:
  print(site, "is the currently selected website")
  
 action = input("\nq = quit, w = change website manualy, c = continue\n")
 
 if action == 'q':
  wb.quit()
  clear()
  sys.exit("\nExiting Script\n")
 
 elif action == 'w':
  site = input("\nPlease enter the website's address or IP\n")
  
  print("\nLooking up website, this may take a moment")
  
  pings = os.system("ping -n 1 " + site)

  wb.Navigate(site)

  while (wb.busy):
   time.sleep(5)
   
  cont = input("\nPress any key to continue\n")
  clear()
   
 elif action == 'c':
  if not site:
   print("\nThere is no website selected\n")
   cont = input("\nPress any key to continue\n")
   clear()
  else:

   text = wb.document.documentElement.innerText
   html = wb.document.documentElement.innerHTML
   
   if len(text) > 0 or len(html) > 0:
    term = input("\nData retrieved, please input search term: \n")
  
    seachingText = re.finditer(term,text,re.I)
    seachingHTML = re.finditer(term,html,re.I)
  
    Textfound = re.search(term,text,re.I)
    HTMLfound = re.search(term,html,re.I)

    if Textfound:
     print ("\nDocument.text: \n")
     for s in seachingText:
      print (s.start(),s.end(),s.group())
    else:
     print ("\nNo matches in Document.text\n")
  
    if HTMLfound:
     print ("\nDocument.HTML: \n")
     for s in seachingHTML:
      print (s.start(),s.end(),s.group())
    else:
     print ("\nNo matches in Document.HTML\n")
   
    extend = input("\nExtend lines? y/n \n")
   
    if extend == 'y':
     seachingText = re.finditer('(.{25})'+term+'(.{25})',text,re.I)
     seachingHTML = re.finditer('(.{25})'+term+'(.{25})',html,re.I)
     
     if Textfound:
      print ("\nDocument.text: \n")
      for s in seachingText:
       print (s.start(),s.end(),s.group())
     else:
      print ("\nNo matches in Document.text\n")       

     if HTMLfound:
      print ("\nDocument.HTML: \n")
      for s in seachingHTML:
       print (s.start(),s.end(),s.group())
     else:
      print ("\nNo matches in Document.HTML\n")
   else:
    print("No data could be found within the specified website")
   
   cont = input("\nPress any key to continue\n")
   clear()

#path1 = "C:\dat.txt"
#path1 =  os.path.normpath(path1)

#with open(path1,"w+") as file1:
# file1.write(text)
# file1.write(html)

#print(text)
#print(html)

#---
#wb.ReadyState != 4 or wb.Document.Readystate != "Complete"):
#wb.Document.GetElementById("USER").Value == ""
#wb.Document.GetElementById("password").Value == ""
#while (wb.busy):
# time.sleep(10)
#wb.document.all.IMAGE1.click()
