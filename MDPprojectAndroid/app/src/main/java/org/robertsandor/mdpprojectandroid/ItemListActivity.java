package org.robertsandor.mdpprojectandroid;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import org.robertsandor.mdpprojectandroid.entities.Product;

public class ItemListActivity extends AppCompatActivity {

    private static final int NUMBER_OF_ITEMS = 30;
    private static final int EDIT_REQUEST_CODE = 1;

    ListView itemListView;
    TextView searchField;

    Product[] products = new Product[NUMBER_OF_ITEMS];
    ArrayAdapter<Product> productAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_item_list);

        itemListView = (ListView) findViewById(R.id.itemListView);
        generateRandomItems();
        productAdapter = new ArrayAdapter<>(this, R.layout.list_item, R.id.product_name, products);
        itemListView.setAdapter(productAdapter);

        Intent intent = getIntent();
        String username = intent.getStringExtra("user");

        Toast.makeText(getApplicationContext(), "Welcome, " + username, Toast.LENGTH_SHORT).show();

        searchField = (TextView) findViewById(R.id.searchField);
        searchField.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                ItemListActivity.this.productAdapter.getFilter().filter(s);
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });

        itemListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Product productClicked = (Product) parent.getItemAtPosition(position);

                Intent editIntent = new Intent(getApplicationContext(), EditProductActivity.class);
                editIntent.putExtra("position", position);
                editIntent.putExtra("name", productClicked.getName());
                editIntent.putExtra("price", productClicked.getPrice());
                editIntent.putExtra("description", productClicked.getDescription());

                startActivityForResult(editIntent, EDIT_REQUEST_CODE);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == EDIT_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                int position = data.getIntExtra("position", -1);
                if (position >= 0) {
                    products[position].setName(data.getStringExtra("name"));
                    products[position].setPrice(Float.parseFloat(data.getStringExtra("price")));
                    products[position].setDescription(data.getStringExtra("description"));

                    productAdapter = new ArrayAdapter<>(this, R.layout.list_item, R.id.product_name, products);
                    itemListView.setAdapter(productAdapter);
                }
            }
        }
    }

    private void generateRandomItems() {
        for (int i = 0; i < NUMBER_OF_ITEMS; i+=5) {
            products[i] = new Product("Acer Aspire " + i / 5, "descriptions", 599.99f);
            products[i + 1] = new Product("Asus Zenbook " + i / 5, "descriptions", 899.99f);
            products[i + 2] = new Product("MacBook 'Pro' " + i / 5, "descriptions", 2499.99f);
            products[i + 3] = new Product("Lenovo Yoga " + i / 5, "descriptions", 1099.99f);
            products[i + 4] = new Product("Acer Predator " + i / 5, "descriptions", 1299.99f);
        }
    }
}
