namespace myjinxin
{
    using System;

    //Kimásolva a codewars oldaláról:
    public class Kata
    {
        public int[] TableGame(int[][] table)
        {

            int a = table[0][0];
            int b = table[0][2];
            int c = table[2][0];
            int d = table[2][2];

            if (table[0][1] != (a + b))
            {
                return [-1];
            }

            if (table[1][0] != (a + c))
            {
                return [-1];
            }

            if (table[1][1] != (a + b + c + d))
            {
                return [-1];
            }

            if (table[1][2] != (d + b))
            {
                return [-1];
            }

            if (table[2][1] != (c + d))
            {
                return [-1];
            }

            return [a, b, c, d];
        }
    }
}