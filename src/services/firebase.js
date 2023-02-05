import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { inRange } from "@/helpers/utils";
import firebaseConfig from "./config";
import { calculateTotal } from '@/helpers/utils';

class Firebase {
  constructor() {
    app.initializeApp({
      apiKey: "AIzaSyDAial4jNnrLM8xglH4DYtl-RHvzNBoh-g",
      authDomain: "itss20221-4a457.firebaseapp.com",
      projectId: "itss20221-4a457",
      storageBucket: "itss20221-4a457.appspot.com",
      messagingSenderId: "400758650008",
      appId: "1:400758650008:web:a9664b999b79b842268ced",
      measurementId: "G-GS2YW9YCZV"
    });

    this.storage = app.storage();
    this.db = app.firestore();
    this.auth = app.auth();
  }

  // AUTH ACTIONS ------------

  createAccount = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = () =>
    this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());

  signInWithFacebook = () =>
    this.auth.signInWithPopup(new app.auth.FacebookAuthProvider());

  signInWithGithub = () =>
    this.auth.signInWithPopup(new app.auth.GithubAuthProvider());

  signOut = () => this.auth.signOut();

  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  addUser = (id, user) => this.db.collection("users").doc(id).set(user);

  getUser = (id) => this.db.collection("users").doc(id).get();

  passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  changePassword = (currentPassword, newPassword) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              resolve("Password updated successfully!");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  reauthenticate = (currentPassword) => {
    const user = this.auth.currentUser;
    const cred = app.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    return user.reauthenticateWithCredential(cred);
  };

  updateEmail = (currentPassword, newEmail) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          user
            .updateEmail(newEmail)
            .then(() => {
              resolve("Email Successfully updated");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  updateProfile = (id, updates) =>
    this.db.collection("users").doc(id).update(updates);

  onAuthStateChanged = () =>
    new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error("Auth State Changed failed"));
        }
      });
    });

  saveBasketItems = (items, userId) =>
    this.db.collection("users").doc(userId).update({ basket: items });

  setAuthPersistence = () =>
    this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

  // // ADMIN USER ACTIONS --------------
  getAllUsers = () => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);

        try {
            const totalQuery = await this.db.collection("users").get();
            const total = totalQuery.docs.length;
            const query = this.db
                .collection("users")
                .orderBy(app.firestore.FieldPath.documentId());
            const snapshot = await query.get();

            clearTimeout(timeout);
            if (!didTimeout) {
              const users = [];
              snapshot.forEach((doc) =>
                  users.push({ id: doc.id, ...doc.data() })
              );

              resolve({ users, total });
            }
          } catch (e) {
            if (didTimeout) return;
            reject(e?.message || ":( Failed to fetch users.");
          }
      })();
    });
  }

  // // PRODUCT ACTIONS --------------

  getSingleProduct = (id) => this.db.collection("products").doc(id).get();

  getProducts = (lastRefKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const query = this.db
              .collection("products")
              .orderBy(app.firestore.FieldPath.documentId())
              .startAfter(lastRefKey)
              .limit(6);

            const snapshot = await query.get();
            const products = [];
            snapshot.forEach((doc) =>
              products.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ products, lastKey });
          } catch (e) {
            reject(e?.message || ":( Failed to fetch products.");
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error("Request timeout, please try again"));
          }, 15000);

          try {
            const totalQuery = await this.db.collection("products").get();
            const total = totalQuery.docs.length;
            const query = this.db
              .collection("products")
              .orderBy(app.firestore.FieldPath.documentId())
              .limit(6);
            const snapshot = await query.get();

            clearTimeout(timeout);
            if (!didTimeout) {
              const products = [];
              snapshot.forEach((doc) =>
                products.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ products, lastKey, total });
            }
          } catch (e) {
            if (didTimeout) return;
            reject(e?.message || ":( Failed to fetch products.");
          }
        }
      })();
    });
  };

  searchProducts = (searchKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        const productsRef = this.db.collection("products");

        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);

        try {
          const searchedNameRef = productsRef
            .orderBy("name_lower")
            .where("name_lower", ">=", searchKey)
            .where("name_lower", "<=", `${searchKey}\uf8ff`)
            .limit(12);
          const searchedKeywordsRef = productsRef
            .orderBy("dateAdded", "desc")
            .where("keywords", "array-contains-any", searchKey.split(" "))
            .limit(12);

          // const totalResult = await totalQueryRef.get();
          const nameSnaps = await searchedNameRef.get();
          const keywordsSnaps = await searchedKeywordsRef.get();
          // const total = totalResult.docs.length;

          clearTimeout(timeout);
          if (!didTimeout) {
            const searchedNameProducts = [];
            const searchedKeywordsProducts = [];
            let lastKey = null;

            if (!nameSnaps.empty) {
              nameSnaps.forEach((doc) => {
                searchedNameProducts.push({ id: doc.id, ...doc.data() });
              });
              lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
            }

            if (!keywordsSnaps.empty) {
              keywordsSnaps.forEach((doc) => {
                searchedKeywordsProducts.push({ id: doc.id, ...doc.data() });
              });
            }

            // MERGE PRODUCTS
            const mergedProducts = [
              ...searchedNameProducts,
              ...searchedKeywordsProducts,
            ];
            const hash = {};

            mergedProducts.forEach((product) => {
              hash[product.id] = product;
            });

            resolve({ products: Object.values(hash), lastKey });
          }
        } catch (e) {
          if (didTimeout) return;
          reject(e);
        }
      })();
    });
  };

  getFeaturedProducts = (itemsCount = 12) =>
    this.db
      .collection("products")
      .where("isFeatured", "==", true)
      .limit(itemsCount)
      .get();

  getRecommendedProducts = (itemsCount = 12) =>
    this.db
      .collection("products")
      .where("isRecommended", "==", true)
      .limit(itemsCount)
      .get();

  getSuggestedProductsByProfile = async (bodyMeasure = {}, itemsCount = 50) => {
    // console.log(bodyMeasure);
    const result = await this.db
      .collection("products")
      .limit(itemsCount)
      .get();

    const data = [];

    result.forEach(doc => data.push({ id: doc.id, ...doc.data() }));

    return data.filter(doc =>
      doc.sizes ?
        doc.sizes.some(size =>
          inRange(size.waist, bodyMeasure.waist, 20) &&
          inRange(size.hip, bodyMeasure.hip, 20) &&
          inRange(size.body_height, bodyMeasure.height, 20) &&
          inRange(size.chest, bodyMeasure.chest, 20)
        ) : false
    );
  }

  addProduct = (id, product) =>
    this.db.collection("products").doc(id).set(product);

  generateKey = () => this.db.collection("products").doc().id;

  storeImage = async (id, folder, imageFile) => {
    const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  };

  deleteImage = (id) => this.storage.ref("products").child(id).delete();

  editProduct = (id, updates) =>
    this.db.collection("products").doc(id).update(updates);

  removeProduct = (id) => this.db.collection("products").doc(id).delete();

  addReview = async (productID, review, rating) => {
    const userInfo = (await this.db.collection("users").doc(this.auth.currentUser.uid).get()).data();
    await this.db.collection("reviews")
        .add({
          userID: this.auth.currentUser.uid,
          fullname: userInfo.fullname,
          avatar: userInfo.avatar,
          productID: productID,
          comment: review,
          rating: rating,
          createdAt: new Date().getTime()
        });
  }

  getReviews = async (productID) => {
    const data = await this.db.collection("reviews").where("productID", "==", productID).limit(50).get();
    // console.log(data);
    const reviews = [];
    data.forEach((doc) =>
      reviews.push({ id: doc.id, ...doc.data() })
    );

    // console.log(reviews);
    return reviews;
  }

  createOrder = async (products, shipping, payment) => {
    try {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      let hh = today.getHours();
      let mn = today.getMinutes();

      today = hh + ':' + mn + ' ' + mm + ' - ' + dd + ' - ' + yyyy;
      return await this.db.collection("orders")
          //status: 0-cancel, 1-confirming, 2-confirmed, 3-delivering, 4-successfully, 5-failed
          .add({ userID: this.auth.currentUser.uid, products, createdAt: today, status: 1, shipping, payment});
      // total: calculateTotal(products.map((product) => product.price * product.quantity))
    } catch (error) {
      console.log("error");
      return null
    }
  }

  addReturn = async (returns) => {
    try {
      return await this.db.collection("returns")
          .add({userID: this.auth.currentUser.uid, returns});
    } catch (error) {
      console.log("error");
      return null;
    }
  }

  getReturnHistory = async () => {
    try {
      const data = await this.db.collection("returns")
          .where("userID", "==", this.auth.currentUser.uid)
          .limit(50)
          .get();

      const returns = [];
      data.forEach((doc) =>
          returns.push({ id: doc.id, ...doc.data() })
      );
      return returns.sort((a, b) => {return a.createdAt < b.createdAt ? 1: -1})
    } catch (error) {
      console.log("error");
      return null;
    }
  }

  getAllOrder = async () => {
    try {
      const data = await this.db.collection("orders").get();
      const user = await this.db.collection("users").get();

      const orders = [];
      const users = [];
      const draft = [];
      user.forEach(doc => {
        users.push({ id: doc.id, ...doc.data()});
      })
      data.forEach((doc) =>{
          draft.push({ id: doc.id, ...doc.data()});
      });
      draft.forEach(doc => {
        const newData = users.find(u => u.id === doc.userID);
        const total = calculateTotal(doc.products.map((product) =>
            product.price * product.quantity));
        orders.push({avatar: newData.avatar, name: newData.fullname, total: total, ...doc});
      })
      return orders.sort((a, b) => {return a.createdAt < b.createdAt ? 1: -1})
    } catch (error) {
      console.log("error");
      return null
    }
  }

  getAllReturns = async () => {
    try {
      const data = await this.db.collection("returns").get();
      const userData = await this.db.collection("users").get();

      const returns = [];
      const users = [];
      const draft = [];
      userData.forEach(doc => {
        users.push({id: doc.id, ...doc.data()});
      })
      data.forEach((doc) => {
        draft.push({id: doc.id, ...doc.data()});
      });
      draft.forEach(doc => {
        const newData = users.find(u => u.id === doc.userID);
        returns.push({avatar: newData.avatar, name: newData.fullname, ...doc});
      })
      return returns.sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1
      })
    } catch (error) {
      console.log("error");
      return null
    }
  }

  getSingleOrder = async (id) =>{
    const data = await this.db.collection("orders").doc(id).get();
    console.log(data);
    return  {id: data.id, ...data.data()};
  }

  updateOrder = (id, updates) => {
    this.db.collection("orders").doc(id).update(updates);
  }

  updateReturn = (id, updates) => {
    this.db.collection("returns").doc(id).update(updates);
  }


  getOrderHistory = async () => {
    try {
      const data = await this.db.collection("orders")
          .where("userID", "==", this.auth.currentUser.uid)
          .limit(50)
          .get();

      const orders = [];
      data.forEach((doc) =>
        orders.push({ id: doc.id, ...doc.data() })
      );
      return orders.sort((a, b) => {return a.createdAt < b.createdAt ? 1: -1})
    } catch (error) {
      console.log("error");
      return null
    }
  }



}

const firebaseInstance = new Firebase();

export default firebaseInstance;
