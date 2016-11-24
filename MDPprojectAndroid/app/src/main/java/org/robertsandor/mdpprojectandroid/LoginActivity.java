package org.robertsandor.mdpprojectandroid;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class LoginActivity extends AppCompatActivity {

    Button loginButton, registerButton;
    TextView usernameField, passwordField;

    private final String mockUsername = "user";
    private final String mockPassword = "password";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        loginButton = (Button) findViewById(R.id.loginButton);
        registerButton = (Button) findViewById(R.id.registerButton);

        usernameField = (TextView) findViewById(R.id.usernameField);
        passwordField = (TextView) findViewById(R.id.passwordField);

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (usernameField.getText().toString().equals(mockUsername) &&
                        passwordField.getText().toString().equals(mockPassword)) {

                    Toast.makeText(getApplicationContext(), "Login succesful.", Toast.LENGTH_SHORT).show();

                    Intent intent = new Intent(getApplicationContext(), ItemListActivity.class);
                    intent.putExtra("user", usernameField.getText().toString());
                    startActivity(intent);

                } else {

                    Toast.makeText(getApplicationContext(), "Invalid credentials!", Toast.LENGTH_SHORT).show();

                }
            }
        });
    }
}
