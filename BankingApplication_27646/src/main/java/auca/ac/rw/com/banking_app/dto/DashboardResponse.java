package auca.ac.rw.com.banking_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {
    private long totalUsers;
    private long totalAccounts;
    private double totalBalance; // Sum of all money in the bank
}