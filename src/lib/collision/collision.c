#include "collision.h"

int len(const char *str)
{
    int i;
    for (i = 0; str[i] != '\0'; i++);
    return i;
}

void print(char *str)
{
    console(str, len(str));
}

int add(int first, int second)
{
    print("Going to add");

    return first + second;
}

