import { bootstrapApplication } from '@angular/platform-browser';
import { ArticleListComponent } from './app/article-list/article-list.component';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';



bootstrapApplication(ArticleListComponent, {
  providers: [HttpClient,provideHttpClient()]})
  .catch((err) => console.error(err));
