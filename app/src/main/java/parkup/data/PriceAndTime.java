package parkup.data;

public class PriceAndTime {
    private int priceToPay;
    private int totalMinutes;

    public PriceAndTime() {}

    public PriceAndTime(int cena, int minuti) {
        this.priceToPay = cena;
        this.totalMinutes = minuti;
    }

    public int getPriceToPay() {
        return priceToPay;
    }

    public void setPriceToPay(int priceToPay) {
        this.priceToPay = priceToPay;
    }

    public int getTotalMinutes() {
        return totalMinutes;
    }

    public void setTotalMinutes(int totalMinutes) {
        this.totalMinutes = totalMinutes;
    }
}
