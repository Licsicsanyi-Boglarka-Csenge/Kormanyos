using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Wpf
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private async Task Growing(Label[] label, Brush color)
        {
            foreach (var l in label)
            {
                l.BorderBrush = color;
                l.BorderThickness = new Thickness(3);
                int szam = Convert.ToInt32(l.Content);
                szam++;
                l.Content = szam;
            }

            await Task.Delay(500);

            foreach (var l in label)
            {
                l.BorderBrush = Brushes.Black;
                l.BorderThickness = new Thickness(2);
            }
        }

        private void A_Click(object sender, RoutedEventArgs e)
        {
            Label[] labels= new Label[] { l1, l2, l4, l5 };
            Growing(labels, Brushes.Red);
        }

        private void B_Click(object sender, RoutedEventArgs e)
        {
            Label[] labels = new Label[] { l2, l3, l5, l6 };
            Growing(labels, Brushes.Orange);
        }
        private void C_Click(object sender, RoutedEventArgs e)
        {
            Label[] labels = new Label[] { l4, l5, l7, l8 };
            Growing(labels, Brushes.Green);
        }
        private void D_Click(object sender, RoutedEventArgs e)
        {
            Label[] labels = new Label[] { l5, l6, l8, l9 };
            Growing(labels, Brushes.Blue);
        }
        private void X_Click(object sender, RoutedEventArgs e)
        {
            Label[] labels = new Label[] { l1, l2, l3, l4, l5, l6, l7, l8, l9 };
            foreach (var l in labels)
            {
                l.Content = 0;
            }
        }
    }
}