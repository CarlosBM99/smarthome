package com.firstapp.cbm.smarthome;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import com.firebase.client.DataSnapshot;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.firebase.client.ValueEventListener;

public class MainActivity extends AppCompatActivity {

    private TextView mValueView;

    private Firebase mRef;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mValueView = (TextView) findViewById(R.id.valueView);
        mRef = new Firebase("https://iot-first-project-28e6a.firebaseio.com/at-home");

        mRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {

                String value = dataSnapshot.getValue(String.class);

                mValueView.setText(value);
            }

            @Override
            public void onCancelled(FirebaseError firebaseError) {

            }
        });
    }
}
