package functions;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import models.Component;

import javax.swing.*;
import java.awt.*;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.lang.reflect.Type;
import java.util.*;
import java.util.List;

public class Parser {
    private List<Component> components;
    private JFrame parsedView;
    public Parser(String jsonPath){
        Type REVIEW_TYPE = new TypeToken<List<Component>>() {
        }.getType();
        Gson gson = new Gson();
        JsonReader reader = null;

        try {
            reader = new JsonReader(new FileReader(jsonPath));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        components = new ArrayList<Component>();
        components = gson.fromJson(reader, REVIEW_TYPE); // contains the whole reviews list
        for (Component component: components) {
            System.out.println(component.getType());
            System.out.println(component.getText());
            System.out.println("Top:"+component.getY());
            System.out.println("Left"+component.getX());
            System.out.println("Height:"+component.getHeight());
            System.out.println("Width"+component.getWidth());
            System.out.println(component.getType());
        }
    }
    public void addComponentsToPane(Container pane) {
        pane.setLayout(null);
        ArrayList<JButton> buttons = new ArrayList<>();
        ArrayList<JLabel> labels = new ArrayList<>();
        ArrayList<JTextField> textfields = new ArrayList<>();

        for (int i=components.size()-1; i>=0; i--){
            Component component = components.get(i);
            if(component.getType().contains("label")){
                pane.add(makeLabel(component.getText(),component.getX()+40,
                        component.getY()+194, component.getWidth(), component.getHeight()));
            }else if(component.getType().contains("textfield")){
                pane.add(makeTextField(component.getX()+195,
                        component.getY()+191, component.getWidth()-10, component.getHeight()+5));
            }else{
                pane.add(makeButton(component.getText(),component.getX()+195,
                        component.getY()+191, component.getWidth(), component.getHeight()));
            }
        }
    }
    public JButton makeButton(String text, float x, float y, int width, int height){
        JButton button = new JButton(text);
        button.setBounds( Math.round(x), Math.round(y), width, height);
        button.setFont(new Font("Arial", Font.PLAIN, 10));
        return button;
    }
    public JLabel makeLabel(String text, float x, float y, int width, int height){
        JLabel label = new JLabel(text);
        label.setBounds( Math.round(x), Math.round(y), width, height);
        return label;
    }
    public JTextField makeTextField(float x, float y, int width, int height){
        JTextField textfield = new JTextField();
        textfield.setBounds( Math.round(x), Math.round(y), width, height);
        return textfield;
    }
    public void generateView() {
        //Create and set up the window.
        parsedView = new JFrame("AbsoluteLayoutDemo");
        parsedView.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        //Set up the content pane.
        addComponentsToPane(parsedView.getContentPane());

        //Size and display the window.
        Insets insets = parsedView.getInsets();
        parsedView.setSize(720 ,650 );
        parsedView.setVisible(true);
    }

    public JFrame getParsedView() {
        return parsedView;
    }

    public void setParsedView(JFrame parsedView) {
        this.parsedView = parsedView;
    }
}
