package org.robertsandor.mdpprojectandroid;

import android.app.Activity;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.app.NotificationCompat;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import org.robertsandor.mdpprojectandroid.entities.Product;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class ItemListActivity extends AppCompatActivity {

    private static final int EDIT_REQUEST_CODE = 1;
    public static final String DB_PRODUCTS = "/products";

    ListView itemListView;
    TextView searchField;

    List<Product> products = new ArrayList<>();
    ArrayAdapter<Product> productAdapter;

    private static DatabaseReference databaseReference;
    private Button addButton;

    @Override
    public void onBackPressed() {
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (databaseReference == null) {
            FirebaseDatabase.getInstance().setPersistenceEnabled(true);
            databaseReference = FirebaseDatabase.getInstance().getReference();
        }

        setContentView(R.layout.activity_item_list);

        itemListView = (ListView) findViewById(R.id.itemListView);
        productAdapter = new ArrayAdapter<>(this, R.layout.list_item, R.id.product_name, products);
        itemListView.setAdapter(productAdapter);

        addButton = (Button) findViewById(R.id.addNewButton);

        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent editIntent = new Intent(getApplicationContext(), EditProductActivity.class);
                editIntent.putExtra("name", "");
                editIntent.putExtra("price", "");
                editIntent.putExtra("description", "");

                startActivityForResult(editIntent, EDIT_REQUEST_CODE);
            }
        });

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

        databaseReference.child(DB_PRODUCTS).addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                Product product = dataSnapshot.getValue(Product.class);
                products.add(product);
                productAdapter.notifyDataSetChanged();
                if (BackgroundCheck.getInstance().isAppIsInBackground(LoginActivity.getContext())) {
                    raiseNotification("Entry added!", "An entry was added to the database!");
                }
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {
                Product product = dataSnapshot.getValue(Product.class);
                if (products.contains(product)) {
                    products.set(products.indexOf(product), product);
                }
                productAdapter.notifyDataSetChanged();
            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {
                Product product = dataSnapshot.getValue(Product.class);
                if (products.contains(product)) {
                    products.remove(product);
                }
                productAdapter.notifyDataSetChanged();
                if (BackgroundCheck.getInstance().isAppIsInBackground(LoginActivity.getContext())) {
                    raiseNotification("Entry deleted!", "An entry was deleted from the database!");
                }
            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                Toast.makeText(getApplicationContext(), "Firebase went offline", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void raiseNotification(String titleMsg ,String bodyMsg){
        android.support.v4.app.NotificationCompat.Builder builder =
                new NotificationCompat.Builder(this)
                        .setSmallIcon(R.mipmap.ic_launcher)
                        .setContentTitle(titleMsg)
                        .setContentText(bodyMsg);

        Intent notificationIntent = new Intent(this, ItemListActivity.class);
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent,
                PendingIntent.FLAG_UPDATE_CURRENT);
        builder.setContentIntent(contentIntent);

        // Add as notification
        NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        manager.notify(0, builder.build());
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == EDIT_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                int position = data.getIntExtra("position", -2);
                if (position >= 0) {
                    String key = products.get(position).getKey();

                    Map<String, Object> firebaseVals = new HashMap<>();
                    firebaseVals.put("name", data.getStringExtra("name"));
                    firebaseVals.put("description", data.getStringExtra("description"));
                    firebaseVals.put("price", data.getFloatExtra("price", 0));
                    firebaseVals.put("key", key);

                    databaseReference.child(DB_PRODUCTS + "/" + key).updateChildren(firebaseVals);
                } else if (position == -1) {
                    final Random random = new Random();

                    String key = databaseReference.child(DB_PRODUCTS).push().getKey();
                    Map<String, Object> firebaseVals = new HashMap<>();
                    firebaseVals.put("name", data.getStringExtra("name"));
                    firebaseVals.put("description", data.getStringExtra("description"));
                    firebaseVals.put("price", data.getFloatExtra("price", 0));
                    firebaseVals.put("key", key);

                    databaseReference.child(DB_PRODUCTS + "/" + key).updateChildren(firebaseVals);
                }
            }
        }
    }
}
