import { bootstrapApplication } from '@angular/platform-browser';
import { ArticleListComponent } from './app/article-list/article-list.component';




bootstrapApplication(ArticleListComponent)
  .catch((err) => console.error(err));
