package org.robertsandor.mdpprojectandroid;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class EditProductActivity extends AppCompatActivity {

    TextView nameField, priceField, descriptionField;
    Button saveButton, cancelButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_product);

        nameField = (TextView) findViewById(R.id.nameField);
        priceField = (TextView) findViewById(R.id.priceField);
        descriptionField = (TextView) findViewById(R.id.descriptionField);

        saveButton = (Button) findViewById(R.id.saveButton);
        cancelButton = (Button) findViewById(R.id.cancelButton);

        final Intent intent = getIntent();

        String name = intent.getStringExtra("name");
        if (name != null) {
            nameField.setText(name);
        }

        final Float price = intent.getFloatExtra("price", -1);
        if (price >= 0) {
            priceField.setText(price.toString());
        }

        String description = intent.getStringExtra("description");
        if (description != null) {
            descriptionField.setText(description);
        }

        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent returnIntent = new Intent();
                returnIntent.putExtra("position", intent.getIntExtra("position", -1));
                returnIntent.putExtra("name", nameField.getText().toString());
                returnIntent.putExtra("price", priceField.getText().toString());
                returnIntent.putExtra("description", descriptionField.getText().toString());

                setResult(Activity.RESULT_OK, returnIntent);
                finish();
            }
        });

        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setResult(Activity.RESULT_CANCELED, new Intent());
                finish();
            }
        });
    }
}
