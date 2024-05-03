#include<stdio.h>
#include<stdlib.h>

#include<sys/types.h>
#include<sys/socket.h>

#include<netinet/in.h>

int main(){

    // create a socket
    int network_socket;
    network_socket = socket(AF_INET, SOCK_STREAM, 0);                            //sock_stream ---> TCP         //1--> TCP, 0--> UDP


    // specify an address for the socket
    struct sockaddr_in server_address;
    server_address.sin_family = AF_INET;                                         //AF_INET --> Address Family    
    server_address.sin_port = htons(9002);                                       //htons --> takes the pain of converting the port number so that our program can understand it
        
    return 0;
}
