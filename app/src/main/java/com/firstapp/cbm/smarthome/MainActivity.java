package com.firstapp.cbm.smarthome;

import android.support.v7.app.AppCompatActivity;
import java.net.*;
import android.os.Bundle;
import android.util.Log;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.firebase.client.ChildEventListener;
import com.firebase.client.DataSnapshot;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.firebase.client.ValueEventListener;

import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.Map;

import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

public class MainActivity extends AppCompatActivity {

    //Declaration Button
    Button btnClickMe;

    private class MyAsyncTask extends AsyncTask {

        @Override
        protected Object doInBackground(Object[] objects) {
            try {
                DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
                DocumentBuilder db = dbf.newDocumentBuilder();
                Document doc = db.parse(new URL("https://www.w3schools.com/xml/note.xml").openStream());
                NodeList list = doc.getElementsByTagName("to");
                Log.i("E", list.item(0).getTextContent());
            } catch ( Exception e){

            }
            Log.i("Executing","Hello2");
            return null;
        }

        protected void onPostExecute(Object o){
            Log.i("Executing","Hello3");
        }
    }



    private Firebase mRef;

    private ArrayList<String> mUsernames = new ArrayList<>();
    private ListView mListView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnClickMe = (Button) findViewById(R.id.httprequest);
        btnClickMe.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MyAsyncTask task1 = new MyAsyncTask();
                Log.i("Executing","Hello");
                task1.execute();
                //Your Logic
            }
        });

        mListView = (ListView) findViewById(R.id.listView);
        mRef = new Firebase("https://iot-first-project-28e6a.firebaseio.com/at-home");

        final ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, mUsernames);
        mListView.setAdapter(arrayAdapter);

        mRef.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {

                Map<String, String> map = dataSnapshot.getValue(Map.class);

                String value = map.get("id");
                String name = map.get("name");


                mUsernames.add(name);
                arrayAdapter.notifyDataSetChanged();

            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {
                Map<String, String> map = dataSnapshot.getValue(Map.class);

                String value = map.get("id");
                String name = map.get("name");

                mUsernames.remove(name);
                arrayAdapter.notifyDataSetChanged();
            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(FirebaseError firebaseError) {

            }
        });
    }

}
