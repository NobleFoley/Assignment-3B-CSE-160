class Camera {
  // Constructor
  constructor() {
    this.type = "camera";
    this.g_eye = new Vector3([0, 0.5, -3]);
    this.g_at = new Vector3([0, 0.5, 100]);
    this.g_up = new Vector3([0, 1, 0]);
  }
  moveForward() {
    var d_at = new Vector3().set(this.g_at);
    var d = d_at.sub(this.g_eye);
    d = d.normalize();

    this.g_eye.add(d);
    this.g_at.add(d);
  }

  moveBackward() {
    var d_at = new Vector3().set(this.g_at);
    var d = d_at.sub(this.g_eye);
    d = d.normalize();

    this.g_eye = this.g_eye.sub(d);
    this.g_at = this.g_at.sub(d);
  }

  moveLeft() {
    var d_at = new Vector3().set(this.g_at);
    var d = d_at.sub(this.g_eye);
    var left = Vector3.cross(d, this.g_up);
    left.normalize();

    this.g_eye.sub(left);
    this.g_at.sub(left);
  }

  moveRight() {
    var d_at = new Vector3().set(this.g_at);
    var d = d_at.sub(this.g_eye);
    var right = Vector3.cross(d, this.g_up);
    right.normalize();

    this.g_eye = this.g_eye.add(right);
    this.g_at = this.g_at.add(right);
  }

  rotateRight() {
    var d_at = new Vector3().set(this.g_at);
    var d = d_at.sub(this.g_eye);
    var r = Math.sqrt(Math.pow(d.elements[2], 2) + Math.pow(d.elements[0], 2));
    var theta = Math.atan2(d.elements[2], d.elements[0]); // Use atan2 for correct angle calculation
    theta = theta + Math.PI / 36; // Rotate by 5 degrees in radians
    var newx = r * Math.cos(theta); // Don't multiply by r
    var newz = r * Math.sin(theta); // Don't multiply by r

    this.g_at.elements[0] = this.g_eye.elements[0] + newx;
    this.g_at.elements[2] = this.g_eye.elements[2] + newz;

    console.log(newx, newz);
  }

  rotateLeft() {
    var d_at = new Vector3().set(this.g_at);
    var d = d_at.sub(this.g_eye);
    var r = Math.sqrt(Math.pow(d.elements[2], 2) + Math.pow(d.elements[0], 2));
    var theta = Math.atan2(d.elements[2], d.elements[0]); // Use atan2 for correct angle calculation
    theta = theta - Math.PI / 36; // Rotate by 5 degrees in radians
    var newx = r * Math.cos(theta); // Don't multiply by r
    var newz = r * Math.sin(theta); // Don't multiply by r

    this.g_at.elements[0] = this.g_eye.elements[0] + newx;
    this.g_at.elements[2] = this.g_eye.elements[2] + newz;

    console.log(newx, newz);
  }

  rotateCamera(mouse_dist) {
    var d_at = new Vector3().set(this.g_at);
    var d = d_at.sub(this.g_eye);
    var r = Math.sqrt(Math.pow(d.elements[2], 2) + Math.pow(d.elements[0], 2));
    var theta = Math.atan2(d.elements[2], d.elements[0]);
    theta = theta + mouse_dist * (Math.PI / 180);
    var newx = r * Math.cos(theta);
    var newz = r * Math.sin(theta);

    this.g_at.elements[0] = this.g_eye.elements[0] + newx;
    this.g_at.elements[2] = this.g_eye.elements[2] + newz;
  }
}
