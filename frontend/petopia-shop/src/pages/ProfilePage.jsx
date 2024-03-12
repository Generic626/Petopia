import React from "react";
import NavbarLayout from "../layout/NavbarLayout";

const ProfilePage = () => {
    return (
        <NavbarLayout>

            <h1 style={{ fontSize: "20px", marginLeft: "20px", marginTop: "40px", padding: "20px" }}><b>Your Profile</b></h1>

            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div
                    style={{
                        textAlign: "left",
                        border: "1px solid black",
                        borderRadius: "10px",
                        padding: "40px",
                        width: "50%",
                        margin: "30px",
                        marginBottom:"170px",
                    }}
                >
                    <form>
                        <div>
                            <label htmlFor="email">Email</label><br></br>
                            <input type="email" id="email" name="email" required style={{ borderRadius: "10px", border: "1px solid black", padding: "5px", width: "100%", marginBottom: "10px" }} defaultValue="doglover@gmail.com" />
                        </div>
                        <div>
                            <label htmlFor="contact">Contact</label><br></br>
                            <input type="text" id="contact" name="contact" required style={{ borderRadius: "10px", border: "1px solid black", padding: "5px", width: "100%", marginBottom: "10px" }} defaultValue="12345678" />
                        </div>
                        <div>
                            <label htmlFor="address">Address</label><br></br>
                            <input type="text" id="address" name="address" required style={{ borderRadius: "10px", border: "1px solid black", padding: "5px", width: "100%", marginBottom: "10px" }} defaultValue=" PolyU Student Halls of Residence, 1 Hung Lai Rd, Hung Hom" />
                        </div>
                        <div>
                            <button type="submit" className="bg-primary h-[40px] w-full text-white rounded-full mt-4">Submit</button>
                        </div>
                    </form>
                </div>

                <div
                    style={{
                        textAlign: "left",
                        border: "1px solid black",
                        borderRadius: "10px",
                        padding: "40px",
                        width: "50%",
                        margin: "30px",
                        marginBottom:"170px",
                    }}
                >
                    <form>
                        <div>
                            <label htmlFor="old-password">Old Password</label><br></br>
                            <input type="password" id="old-password" name="old-password" required style={{ borderRadius: "10px", border: "1px solid black", padding: "5px", width: "100%", marginBottom: "10px" }} />
                        </div>
                        <div>
                            <label htmlFor="new-password">New Password</label><br></br>
                            <input type="password" id="new-password" name="new-password" required style={{ borderRadius: "10px", border: "1px solid black", padding: "5px", width: "100%", marginBottom: "10px" }} />
                        </div>
                        <div>
                            <label htmlFor="confirm-password">Confirm Password</label><br></br>
                            <input type="password" id="confirm-password" name="confirm-password" required style={{ borderRadius: "10px", border: "1px solid black", padding: "5px", width: "100%", marginBottom: "10px" }} />
                        </div>
                        <div>
                            <button type="submit" className="bg-primary h-[40px] w-full text-white rounded-full mt-4">Reset</button>
                        </div>
                    </form>
                </div>

            </div>
        </NavbarLayout>
    );
};

export default ProfilePage;