package functions;

import javax.swing.*;
import java.awt.event.*;
import java.io.File;

public class Main extends JDialog {
    private JPanel contentPane;
    private JButton btnImport;
    private JButton btnGenerate;
    private String filePath = "";
    private Parser parser;
    public Main() {
        setContentPane(contentPane);
        setModal(true);
        getRootPane().setDefaultButton(btnImport);

        btnImport.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                onImport();
            }
        });

        btnGenerate.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                onGenerate();
            }
        });

    }

    private void onImport() {
        JFileChooser fc = new JFileChooser();
        int returnVal = fc.showOpenDialog(this);

        if (returnVal == JFileChooser.APPROVE_OPTION) {
            File file = fc.getSelectedFile();
            filePath = file.getPath();
            System.out.println("FilePath: " + filePath);
        } else {
            System.out.println("Cancelled");
        }
        System.out.println("Imported JSON");

    }

    private void onGenerate() {
        if(filePath != ""){
            if(parser != null){
                parser.getParsedView().dispose();
            }
            parser = new Parser(filePath);
            parser.generateView();

        }

    }

    public static void main(String[] args) {
        Main dialog = new Main();
        dialog.pack();
        dialog.setVisible(true);
        System.exit(0);
    }
}
