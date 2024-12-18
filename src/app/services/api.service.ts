import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModal } from '../admin/model/recipeModal';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // server_url = "http://localhost:3000"
  server_url = "https://cookpedia-server-mean.onrender.com"

  constructor(private http:HttpClient) { }

  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/all-recipes`)
  }
  // add-testimony
  addTestimonyAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`,reqBody)
  }
  // register
  registerAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
  }
  // login
  loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
  }

  // appendToken in req header
  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  // recipe/:id/view
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,this.appendToken())
  }

  // related-recipes?cuisine=Pakistani
  relatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  // recipe/674ecf3c35432cc4b1546bb0/download
  downloadRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`,reqBody,this.appendToken())
  }

  // recipe/:id/save
  saveRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())
  }

  // get-save-recipes
  getUserSaveRecipeAPI(){
    return this.http.get(`${this.server_url}/get-save-recipes`,this.appendToken())
  }

  // save-recipes/:id/remove
  deleteSaveRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/save-recipes/${id}/remove`,this.appendToken())
  }

  // user-downloads
  getUserDownloadRecipesAPI(){
    return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
  }

  // user/edit
  editUserAPI(reqBody:any){
    return this.http.post(`${this.server_url}/user/edit`,reqBody,this.appendToken())
  }

  // all-users
  allUsersAPI(){
    return this.http.get(`${this.server_url}/all-users`,this.appendToken())
  }

  // download-list
  allDownloadListAPI(){
    return this.http.get(`${this.server_url}/download-list`,this.appendToken())
  }

  // all-feedback
  getAllFeedbackListAPI(){
    return this.http.get(`${this.server_url}/all-feedback`,this.appendToken())
  }

  // feedback/675028e0cdef81a97fa15e89/update?status=Approved
  updateFeedbackStatusAPI(feedBackId:string,status:string){
    return this.http.get(`${this.server_url}/feedback/${feedBackId}/update?status=${status}`,this.appendToken())
  }

  // all-approved-feedback
  getAllApprovedFeedbackAPI(){
    return this.http.get(`${this.server_url}/all-approved-feedback`)
  }

  // add-recipe
  addRecipeAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-recipe`,reqBody,this.appendToken())
  }

  // recipe/675bf7215b7b360e6c79d62b/edit
  updateRecipeAPI(id:string,reqBody:RecipeModal){
    return this.http.put(`${this.server_url}/recipe/${id}/edit`,reqBody,this.appendToken())
  }

  // recipes/:id/remove
  deleteRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/recipes/${id}/remove`,this.appendToken())
  }

  // get chart data
  getChartData(){
    this.allDownloadListAPI().subscribe((res:any)=>{
      console.log(res);
      let downloadArrayList:any = []
      let output:any = {}
      res.forEach((item:any)=>{
        let cuisine = item.recipeCuisine
        let currentCount = item.count
        if(output.hasOwnProperty(cuisine)){
          output[cuisine] += currentCount
        }else{
          output[cuisine] = currentCount
        }
      })
      console.log(output);
      for(let cuisine in output){
        downloadArrayList.push({name:cuisine,y:output[cuisine]})
      }
      console.log(downloadArrayList);
      localStorage.setItem("chart",JSON.stringify(downloadArrayList))
    })
  }

}
