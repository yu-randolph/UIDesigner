package models;

public class Component {
    public String type;
    public String text;
    public int width;
    public int height;
    public float x;
    public float y;

    public Component(String type, String text, int width, int height, float x, float y){
        this.type = type;
        this.text = text;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;

    }
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }
}
