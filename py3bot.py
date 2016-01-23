#!/usr/bin/env python3

import sys
import socket
import string
from threading import Timer

HOST = "irc.freenode.net"
PORT = 6667

NICK = #botNick
IDENT = #password
REALNAME = #botNick
MASTER = #botOwnerNick
CHANNEL = "#botTesting"

readbuffer = ""

s=socket.socket( )
s.connect((HOST, PORT))

s.send(bytes("NICK "+ NICK + "\r\n", "UTF-8"));
s.send(bytes("USER "+ IDENT + " " + HOST + " " + REALNAME + ":This is a bot thingy \r\n", "UTF-8"));
s.send(bytes("JOIN "+ CHANNEL + "\r\n", "UTF-8"));

s.send(bytes("PRIVMSG %s :Hello, testing 1 2 3\r\n" % MASTER, "UTF-8"))

def tell(recipient,message):
    s.send(bytes("PRIVMSG "+ recipient + " :" + message + "\r\n", "UTF-8"))

while 1:
    readbuffer = readbuffer+s.recv(512).decode("UTF-8")
    temp = str.split(readbuffer, "\n")
    readbuffer=temp.pop( )

    for line in temp:
        line = str.rstrip(line)
        line = str.split(line)

        if(line[0] == "PING"):
            s.send(bytes("PONG %s\r\n" % line[1], "UTF-8"))

        if(line[1] == "PRIVMSG"):
            if(line[3] == ":!msgMe"):
                sender = ""
                for char in line[0]:
                    if(char == "!"):
                        break
                    if(char != ":"):
                        sender += char 
                size = len(line)
                i = 3
                message = "OH HAI!" 
                s.send(bytes("PRIVMSG "+ sender + " :" + message + "\r\n", "UTF-8"))
            elif(line [3] == ":!quit"):
                s.send(bytes("QUIT %s\r\n", "UTF-8"))
            elif(line [3] == ":!poke"):
                s.send(bytes(sender + " =====> " + line[4], "UTF-8"))
            elif(line [3] == ":!ping"):
                s.send(bytes("PRIVMSG "+ CHANNEL + " :PONG!!! (╯°□°)╯︵ ┻━┻\r\n", "UTF-8"))
            elif(line[3] == ":!tell"):
                recipient = line[4]
                delaySec = line[5]
                message = ''
                j = 6
                while j < len(line):
                    message += line[j]
                    message += ' '
                    j += 1
                i = 3
                #t = Timer(delaySec, tell,[recipient,message]) #this one i'm trying to get to work, should execute the function after a delay
                tell(recipient,message) #this one works but is instant
        for index, i in enumerate(line):
            print(line[index],index)
