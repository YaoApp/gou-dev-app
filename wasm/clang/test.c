#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int add( int a, int b ) {
    return a+b;
}

char* echo( char* value ) {
    char *prefix = "echo: ";
    return strcat(prefix, value);
}

char* bytes( char *value, int size) {
    char * buf;
    strncpy(buf, value, size);
    return buf;
}

int main(int argc, char **argv) {
}
